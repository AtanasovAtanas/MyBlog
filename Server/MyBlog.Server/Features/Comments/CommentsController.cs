namespace MyBlog.Server.Features.Comments
{
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

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<CreateCommentResponseModel>> CreateComment(
            CreateCommentRequestModel inputModel)
        {
            var userId = this.User.GetId();

            var commentId = await this.commentsService.CreateAsync(
                inputModel.ArticleId,
                inputModel.ParentId,
                inputModel.Content,
                userId);

            return new CreateCommentResponseModel { CommentId = commentId };
        }

        [HttpPut]
        [Authorize]
        [Route(Id)]
        public async Task<ActionResult<CreateCommentResponseModel>> UpdateComment(
            int id,
            UpdateCommentRequestModel inputModel)
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

            return new CreateCommentResponseModel { CommentId = id };
        }

        [HttpDelete]
        [Authorize]
        [Route(Id)]
        public async Task<ActionResult> Delete(int id)
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
