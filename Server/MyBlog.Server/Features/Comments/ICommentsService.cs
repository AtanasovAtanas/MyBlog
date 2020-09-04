namespace MyBlog.Server.Features.Comments
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using MyBlog.Server.Features.Comments.Models;
    using MyBlog.Server.Infrastructure.Services;

    public interface ICommentsService
    {
        Task<IEnumerable<TModel>> GetAllRepliesByCommentIdAsync<TModel>(int commentId);

        Task<TModel> GetByIdAsync<TModel>(int commentId);

        Task<int> CreateAsync(int articleId, int? parentId, string content, string authorId);

        Task<Result> UpdateAsync(int commentId, string authorId, string content);

        Task<Result> DeleteAsync(int commentId, string authorId);
    }
}
