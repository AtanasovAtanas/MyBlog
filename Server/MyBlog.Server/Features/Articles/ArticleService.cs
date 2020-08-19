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

        public async Task<IEnumerable<TModel>> All<TModel>() =>
            await this.articleRepository
                .All()
                .To<TModel>()
                .ToListAsync();

        public async Task<IEnumerable<TModel>> AllByUserId<TModel>(string userId) =>
            await this.articleRepository
                .All()
                .Where(a => a.AuthorId == userId)
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
    }
}
