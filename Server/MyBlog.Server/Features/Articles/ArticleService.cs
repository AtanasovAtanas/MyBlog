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
    using MyBlog.Server.Infrastructure.Mapping;
    using MyBlog.Server.Infrastructure.Services;

    using static ArticlesConstants;
    using static ErrorMessages.Articles;

    public class ArticleService : IArticleService
    {
        private readonly HtmlSanitizer htmlSanitizer;
        private readonly IDeletableEntityRepository<Article> articleRepository;

        public ArticleService(IDeletableEntityRepository<Article> articleRepository)
        {
            this.articleRepository = articleRepository;

            this.htmlSanitizer = new HtmlSanitizer();
        }

        public async Task<IEnumerable<TModel>> All<TModel>(int page, string filter)
        {
            var query = this.articleRepository.All();

            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(a => a.Title.Contains(filter) || a.Content.Contains(filter));
            }

            return await query
                .Skip((page - 1) * ArticlesPerPage)
                .Take(ArticlesPerPage)
                .To<TModel>()
                .ToListAsync();
        }

        public async Task<IEnumerable<TModel>> AllByUserId<TModel>(string userId, int page, string filter)
        {
            var query = this.articleRepository
                .All()
                .Where(a => a.AuthorId == userId);

            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(a => a.Title.Contains(filter) || a.Content.Contains(filter));
            }

            return await query
                   .OrderByDescending(a => a.CreatedOn)
                   .Skip((page - 1) * ArticlesPerPage)
                   .Take(ArticlesPerPage)
                   .To<TModel>()
                   .ToListAsync();
        }

        public async Task<IEnumerable<TModel>> GetAllCommentsByArticleId<TModel>(int articleId)
            => await this.articleRepository
                .All()
                .Where(a => a.Id == articleId)
                .SelectMany(a => a.Comments)
                .Where(c => c.ParentId == null && !c.IsDeleted)
                .To<TModel>()
                .ToListAsync();

        public async Task<int> AddAsync(
            string title,
            string content,
            string userId)
        {
            var article = new Article
            {
                Title = title,
                Content = this.htmlSanitizer.Sanitize(content),
                AuthorId = userId,
            };

            await this.articleRepository.AddAsync(article);
            await this.articleRepository.SaveChangesAsync();

            return article.Id;
        }

        public async Task<TModel> Details<TModel>(int id)
            => await this.articleRepository
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
            var article = await this.articleRepository.GetByIdAsync(id);

            if (article.AuthorId != userId)
            {
                return InvalidUpdateByNonAuthor;
            }

            article.Title = title;
            article.Content = this.htmlSanitizer.Sanitize(content);

            this.articleRepository.Update(article);
            await this.articleRepository.SaveChangesAsync();

            return true;
        }

        public async Task<Result> Delete(
            int id,
            string userId)
        {
            var article = await this.articleRepository.GetByIdAsync(id);

            if (article.AuthorId != userId)
            {
                return InvalidDeletionByNonAuthor;
            }

            this.articleRepository.Delete(article);

            await this.articleRepository.SaveChangesAsync();

            return true;
        }

        public async Task<int> AllArticlesCount()
            => await this.articleRepository.AllAsNoTracking().CountAsync();

        public async Task<int> AllArticlesCountByUserId(string userId) =>
            await this.articleRepository
                .AllAsNoTracking()
                .Where(a => a.AuthorId == userId)
                .CountAsync();
    }
}
