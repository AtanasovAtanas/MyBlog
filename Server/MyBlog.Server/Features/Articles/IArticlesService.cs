namespace MyBlog.Server.Features.Articles
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using MyBlog.Server.Features.Articles.Models;
    using MyBlog.Server.Infrastructure.Services;

    public interface IArticlesService
    {
        Task<IEnumerable<TModel>> AllByUserId<TModel>(string userId, int page, string filter);

        Task<IEnumerable<TModel>> GetAllCommentsByArticleIdAsync<TModel>(int articleId);

        Task<int> AddAsync(string title, string content, string categoryName, IEnumerable<string> tags, string userId);

        Task<ArticleDetailsResponseModel> DetailsAsync(int id);

        Task<Result> UpdateAsync(int id, string title, string content, IEnumerable<string> tags, string userId);

        Task<Result> DeleteAsync(int id, string userId);

        Task<int> GetAllArticlesCountByUserIdAsync(string userId);
    }
}
