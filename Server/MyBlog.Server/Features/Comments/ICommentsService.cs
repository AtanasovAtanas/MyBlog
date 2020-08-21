namespace MyBlog.Server.Features.Comments
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using MyBlog.Server.Features.Comments.Models;
    using MyBlog.Server.Infrastructure.Services;

    public interface ICommentsService
    {
        Task<IEnumerable<TModel>> GetAllRepliesByCommentId<TModel>(int commentId);

        Task<int> CreateAsync(int articleId, int? parentId, string content, string authorId);

        Task<Result> Update(int commentId, string authorId, string content);

        Task<Result> Delete(int commentId, string authorId);
    }
}
