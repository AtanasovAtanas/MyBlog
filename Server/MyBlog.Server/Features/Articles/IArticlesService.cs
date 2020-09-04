namespace MyBlog.Server.Features.Articles
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using MyBlog.Server.Features.Articles.Models;
    using MyBlog.Server.Infrastructure.Services;

    public interface IArticlesService
    {
        Task<IEnumerable<TModel>> AllByUserId<TModel>(string userId, int page, string filter);

        Task<IEnumerable<TModel>> GetAllCommentsByArticleId<TModel>(int articleId);

        Task<int> AddAsync(string title, string content, string categoryName, IEnumerable<string> tags, string userId);

        Task<TModel> Details<TModel>(int id);

        Task<Result> Update(int id, string title, string content, IEnumerable<string> tags, string userId);

        Task<Result> Delete(int id, string userId);

        Task<int> AllArticlesCountByUserId(string userId);
    }
}
