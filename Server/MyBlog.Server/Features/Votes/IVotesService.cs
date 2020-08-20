namespace MyBlog.Server.Features.Votes
{
    using System.Threading.Tasks;

    using MyBlog.Server.Data.Models;

    public interface IVotesService
    {
        int GetVotes(int articleId);

        Task VoteAsync(int articleId, string userId, VoteType voteType);
    }
}
