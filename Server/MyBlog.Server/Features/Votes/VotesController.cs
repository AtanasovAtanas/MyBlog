namespace MyBlog.Server.Features.Votes
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using MyBlog.Server.Data.Models;
    using MyBlog.Server.Features.Votes.Models;
    using MyBlog.Server.Infrastructure.Extensions;

    using static MyBlog.Server.Infrastructure.WebConstants;

    public class VotesController : ApiController
    {
        private readonly IVotesService votesService;

        public VotesController(IVotesService votesService)
        {
            this.votesService = votesService;
        }

        [HttpGet]
        [Route(Id)]
        public int GetVotes(int articleId) =>
            this.votesService.GetVotes(articleId);

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<VoteResponseModel>> VoteAsync(VoteRequestModel model)
        {
            var userId = this.User.GetId();

            await this.votesService.VoteAsync(model.ArticleId, userId, model.VoteType);

            var votesCount = this.GetVotes(model.ArticleId);

            return new VoteResponseModel { VotesCount = votesCount };
        }
    }
}
