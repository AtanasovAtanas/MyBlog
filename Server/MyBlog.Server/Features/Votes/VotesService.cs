namespace MyBlog.Server.Features.Votes
{
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using MyBlog.Server.Data.Models;
    using MyBlog.Server.Data.Repositories.Contracts;
    using MyBlog.Server.Features.Votes.Models;

    public class VotesService : IVotesService
    {
        private readonly IRepository<Vote> votesRepository;

        public VotesService(IRepository<Vote> votesRepository)
        {
            this.votesRepository = votesRepository;
        }

        public int GetVotes(int articleId) =>
            this.votesRepository
                .All()
                .Where(v => v.ArticleId == articleId)
                .Sum(v => (int)v.Type);

        public async Task VoteAsync(int articleId, string userId, VoteType voteType)
        {
            var vote = await this.votesRepository
                .All()
                .FirstOrDefaultAsync(
                    v => v.ArticleId == articleId && v.UserId == userId);

            if (vote == null)
            {
                vote = new Vote
                {
                    ArticleId = articleId,
                    UserId = userId,
                    Type = voteType,
                };

                await this.votesRepository.AddAsync(vote);
                await this.votesRepository.SaveChangesAsync();
            }
            else
            {
                vote.Type = voteType;

                this.votesRepository.Update(vote);
                await this.votesRepository.SaveChangesAsync();
            }
        }

        public async Task<UserVoteTypeResponseModel> GetUserVoteType(int articleId, string userId)
        {
            var vote = await this.votesRepository
                .All()
                .FirstOrDefaultAsync(
                    v => v.ArticleId == articleId && v.UserId == userId);

            var result = vote?.Type ?? VoteType.Neutral;

            return new UserVoteTypeResponseModel { VoteType = (int)result };
        }
    }
}
