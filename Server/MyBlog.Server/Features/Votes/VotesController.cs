namespace MyBlog.Server.Features.Votes
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using MyBlog.Server.Data.Models;
    using MyBlog.Server.Features.Votes.Models;
    using MyBlog.Server.Infrastructure.Extensions;

    using static MyBlog.Server.Infrastructure.RoutesConstants;

    public class VotesController : ApiController
    {
        private readonly IVotesService votesService;

        public VotesController(IVotesService votesService)
        {
            this.votesService = votesService;
        }

        [HttpGet]
        [Route(Id)]
        public InputVoteResponseModel GetVotes(int id)
        {
            var votesCount = this.votesService.GetVotes(articleId: id);

            return new InputVoteResponseModel { VotesCount = votesCount };
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<InputVoteResponseModel>> VoteAsync(VoteRequestModel model)
        {
            var userId = this.User.GetId();

            await this.votesService.VoteAsync(model.ArticleId, userId, model.VoteType);

            return this.GetVotes(model.ArticleId);
        }

        [HttpGet]
        public async Task<ActionResult<UserVoteTypeResponseModel>> GetUserVoteType(
            [FromQuery] int articleId) =>
            await this.votesService.GetUserVoteType(articleId, this.User?.GetId());
    }
}
