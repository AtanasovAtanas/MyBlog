namespace MyBlog.Server.Features.Votes
{
    using System.Threading.Tasks;

    using MyBlog.Server.Data.Models;
    using MyBlog.Server.Features.Votes.Models;

    public interface IVotesService
    {
        int GetVotesByArticleId(int articleId);

        Task VoteAsync(int articleId, string userId, VoteType voteType);

        Task<UserVoteTypeResponseModel> GetUserVoteTypeAsync(int articleId, string userId);
    }
}
