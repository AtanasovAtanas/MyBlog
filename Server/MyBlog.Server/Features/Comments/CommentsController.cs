namespace MyBlog.Server.Features.Comments
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using MyBlog.Server.Features.Comments.Models;
    using MyBlog.Server.Infrastructure.Extensions;

    using static MyBlog.Server.Infrastructure.RoutesConstants.Common;

    public class CommentsController : ApiController
    {
        private readonly ICommentsService commentsService;

        public CommentsController(ICommentsService commentsService)
        {
            this.commentsService = commentsService;
        }

        [HttpGet]
        [Route(Id)]
        public async Task<IEnumerable<CommentListingModel>> GetRepliesByComment([FromRoute] int id)
        {
            var result = await this.commentsService.GetAllRepliesByCommentIdAsync<CommentListingModel>(id);

            return result;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<CommentListingModel>> CreateComment(
            [FromBody] CreateCommentRequestModel inputModel)
        {
            var commentId = await this.commentsService.CreateAsync(
                   inputModel.ArticleId,
                   inputModel.ParentId,
                   inputModel.Content,
                   this.User.GetId());

            return await this.commentsService.GetByIdAsync<CommentListingModel>(commentId);
        }

        [HttpPut]
        [Authorize]
        [Route(Id)]
        public async Task<ActionResult<InputCommentResponseModel>> UpdateComment(
            [FromRoute] int id,
            [FromBody] UpdateCommentRequestModel inputModel)
        {
            var userId = this.User.GetId();

            var result = await this.commentsService.UpdateAsync(
                id,
                userId,
                inputModel.Content);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return new InputCommentResponseModel { CommentId = id };
        }

        [HttpDelete]
        [Authorize]
        [Route(Id)]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            var userId = this.User.GetId();

            var result = await this.commentsService.DeleteAsync(id, userId);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok();
        }
    }
}
