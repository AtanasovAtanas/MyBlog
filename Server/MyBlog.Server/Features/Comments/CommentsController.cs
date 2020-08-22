namespace MyBlog.Server.Features.Comments
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using MyBlog.Server.Features.Comments.Models;
    using MyBlog.Server.Infrastructure.Extensions;

    using static MyBlog.Server.Infrastructure.WebConstants;

    public class CommentsController : ApiController
    {
        private readonly ICommentsService commentsService;

        public CommentsController(ICommentsService commentsService)
        {
            this.commentsService = commentsService;
        }

        [HttpGet]
        [Route(Id)]
        public async Task<IEnumerable<ListCommentModel>> GetRepliesByComment([FromRoute] int id)
        {
            var result = await this.commentsService.GetAllRepliesByCommentId<ListCommentModel>(id);

            return result;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<InputCommentResponseModel>> CreateComment(
            [FromBody] CreateCommentRequestModel inputModel)
        {
            var userId = this.User.GetId();

            var commentId = await this.commentsService.CreateAsync(
                inputModel.ArticleId,
                inputModel.ParentId,
                inputModel.Content,
                userId);

            return new InputCommentResponseModel { CommentId = commentId };
        }

        [HttpPut]
        [Authorize]
        [Route(Id)]
        public async Task<ActionResult<InputCommentResponseModel>> UpdateComment(
            [FromRoute] int id,
            [FromBody] UpdateCommentRequestModel inputModel)
        {
            var userId = this.User.GetId();

            var result = await this.commentsService.Update(
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

            var result = await this.commentsService.Delete(id, userId);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok();
        }
    }
}
