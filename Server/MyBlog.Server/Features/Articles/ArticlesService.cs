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

        public ArticlesService(
            IDeletableEntityRepository<Article> articlesRepository,
            ICategoriesService categoriesService)
        {
            this.articlesRepository = articlesRepository;
            this.categoriesService = categoriesService;

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

        public async Task<IEnumerable<TModel>> GetAllCommentsByArticleId<TModel>(int articleId)
            => await this.articlesRepository
                .All()
                .Where(a => a.Id == articleId)
                .SelectMany(a => a.Comments)
                .Where(c => c.ParentId == null && !c.IsDeleted)
                .To<TModel>()
                .ToListAsync();

        public async Task<int> AddAsync(
            string title,
            string content,
            string categoryName,
            string userId)
        {
            var categoryId = await this.categoriesService.GetIdByName(categoryName);

            var article = new Article
            {
                Title = title,
                Content = this.htmlSanitizer.Sanitize(content),
                AuthorId = userId,
                CategoryId = categoryId,
            };

            await this.articlesRepository.AddAsync(article);
            await this.articlesRepository.SaveChangesAsync();

            return article.Id;
        }

        public async Task<TModel> Details<TModel>(int id)
            => await this.articlesRepository
            .All()
            .Where(a => a.Id == id)
            .To<TModel>()
            .FirstOrDefaultAsync();

        public async Task<Result> Update(
            int id,
            string title,
            string content,
            string userId)
        {
            var article = await this.articlesRepository.GetByIdAsync(id);

            if (article.AuthorId != userId)
            {
                return InvalidUpdateByNonAuthor;
            }

            article.Title = title;
            article.Content = this.htmlSanitizer.Sanitize(content);

            this.articlesRepository.Update(article);
            await this.articlesRepository.SaveChangesAsync();

            return true;
        }

        public async Task<Result> Delete(
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

        public async Task<int> AllArticlesCountByUserId(string userId) =>
            await this.articlesRepository
                .AllAsNoTracking()
                .Where(a => a.AuthorId == userId)
                .CountAsync();
    }
}
