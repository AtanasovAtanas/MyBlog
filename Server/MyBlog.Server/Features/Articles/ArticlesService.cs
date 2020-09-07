namespace MyBlog.Server.Features.Articles
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Ganss.XSS;
    using Microsoft.EntityFrameworkCore;
    using MyBlog.Server.Data.Models;
    using MyBlog.Server.Data.Repositories.Contracts;
    using MyBlog.Server.Features.Articles.Models;
    using MyBlog.Server.Features.Categories;
    using MyBlog.Server.Features.Comments;
    using MyBlog.Server.Features.Comments.Models;
    using MyBlog.Server.Features.Tags;
    using MyBlog.Server.Infrastructure.Extensions;
    using MyBlog.Server.Infrastructure.Mapping;
    using MyBlog.Server.Infrastructure.Services;

    using static ArticlesConstants;
    using static ErrorMessages.Articles;

    public class ArticlesService : IArticlesService
    {
        private readonly HtmlSanitizer htmlSanitizer;
        private readonly IDeletableEntityRepository<Article> articlesRepository;
        private readonly ICategoriesService categoriesService;
        private readonly ITagsService tagsService;
        private readonly ICommentsService commentsService;

        public ArticlesService(
            IDeletableEntityRepository<Article> articlesRepository,
            ICategoriesService categoriesService,
            ITagsService tagsService,
            ICommentsService commentsService)
        {
            this.articlesRepository = articlesRepository;

            this.categoriesService = categoriesService;
            this.tagsService = tagsService;
            this.commentsService = commentsService;

            this.htmlSanitizer = new HtmlSanitizer();
        }

        public async Task<IEnumerable<TModel>> AllByUserId<TModel>(string userId, int page, string filter)
        {
            var query = this.articlesRepository
                .All()
                .Where(a => a.AuthorId == userId);

            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(a => a.Title.Contains(filter) || a.Content.Contains(filter));
            }

            return await query
                   .OrderByDescending(a => a.CreatedOn)
                   .Page(page, ArticlesPerPage)
                   .To<TModel>()
                   .ToListAsync();
        }

        public async Task<int> AddAsync(
            string title,
            string content,
            string categoryName,
            IEnumerable<string> tags,
            string userId)
        {
            var categoryId = await this.categoriesService.GetIdByNameAsync(categoryName);

            var article = new Article
            {
                Title = title,
                Content = this.htmlSanitizer.Sanitize(content),
                AuthorId = userId,
                CategoryId = categoryId,
            };

            foreach (var tagName in tags)
            {
                var tagId = await this.GetTagIdOrCreate(tagName);

                article.Tags.Add(new ArticleTag { TagId = tagId });
            }

            await this.articlesRepository.AddAsync(article);
            await this.articlesRepository.SaveChangesAsync();

            return article.Id;
        }

        public async Task<ArticleDetailsResponseModel> DetailsAsync(int id)
        {
            var article = await this.articlesRepository
                .All()
                .Where(a => a.Id == id)
                .To<ArticleDetailsResponseModel>()
                .FirstOrDefaultAsync();

            var articleComments =
                await this.commentsService.GetAllCommentsWithRepliesByArticleId(id);

            article.Comments = articleComments;

            return article;
        }

        public async Task<Result> UpdateAsync(
            int id,
            string title,
            string content,
            IEnumerable<string> tags,
            string userId)
        {
            var article = await this.articlesRepository
                .All()
                .Where(a => a.Id == id)
                .Include(a => a.Tags)
                .ThenInclude(at => at.Tag)
                .FirstOrDefaultAsync();

            if (article.AuthorId != userId)
            {
                return InvalidUpdateByNonAuthor;
            }

            article.Title = title;
            article.Content = this.htmlSanitizer.Sanitize(content);

            await this.UpdateArticleTags(article, tags);

            this.articlesRepository.Update(article);
            await this.articlesRepository.SaveChangesAsync();

            return true;
        }

        public async Task<Result> DeleteAsync(
            int id,
            string userId)
        {
            var article = await this.articlesRepository.GetByIdAsync(id);

            if (article.AuthorId != userId)
            {
                return InvalidDeletionByNonAuthor;
            }

            this.articlesRepository.Delete(article);

            await this.articlesRepository.SaveChangesAsync();

            return true;
        }

        public async Task<int> GetAllArticlesCountByUserIdAsync(string userId)
            => await this.articlesRepository
                .AllAsNoTracking()
                .Where(a => a.AuthorId == userId)
                .CountAsync();

        private async Task UpdateArticleTags(Article article, IEnumerable<string> tags)
        {
            var tagsToBeRemoved = article
                .Tags
                .Where(at => !tags.Contains(at.Tag.Name))
                .ToList();

            foreach (var tag in tagsToBeRemoved)
            {
                article.Tags.Remove(tag);
            }

            foreach (var tagName in tags)
            {
                var tagId = await this.GetTagIdOrCreate(tagName);

                if (article.Tags.All(at => at.TagId != tagId))
                {
                    article.Tags.Add(new ArticleTag { TagId = tagId });
                }
            }
        }

        private async Task<int> GetTagIdOrCreate(string tagName)
        {
            var tagId = await this.tagsService.GetIdByNameAsync(tagName);

            if (tagId == 0)
            {
                tagId = await this.tagsService.AddAsync(tagName);
            }

            return tagId;
        }
    }
}
