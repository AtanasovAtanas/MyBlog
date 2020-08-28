namespace MyBlog.Server.Features.Articles
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using MyBlog.Server.Features.Articles.Models;
    using MyBlog.Server.Features.Comments.Models;
    using MyBlog.Server.Infrastructure;
    using MyBlog.Server.Infrastructure.Extensions;
    using MyBlog.Server.Infrastructure.Services;

    using static Infrastructure.WebConstants;

    public class ArticlesController : ApiController
    {
        private readonly IArticleService articleService;
        private readonly ICurrentUserService currentUser;

        public ArticlesController(
            IArticleService articleService,
            ICurrentUserService currentUser)
        {
            this.articleService = articleService;
            this.currentUser = currentUser;
        }

        [HttpGet]
        [Authorize]
        [Route(WebConstants.Mine)]
        public async Task<IEnumerable<ArticleDetailsResponseModel>> Mine(
            [FromQuery] int? page, [FromQuery] string filter)
        {
            page ??= 1;
            var userId = this.User.GetId();

            var result =
               await this.articleService.AllByUserId<ArticleDetailsResponseModel>(userId, page.Value, filter);

            return result;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<InputArticleResponseModel>> Create(
            [FromBody] CreateArticleRequestModel inputModel)
        {
            var userId = this.currentUser.GetId();

            var articleId = await this.articleService.AddAsync(
                   inputModel.Title,
                   inputModel.Content,
                   inputModel.CategoryName,
                   userId);

            return new InputArticleResponseModel { Id = articleId };
        }

        [HttpGet]
        [Route(Id)]
        public async Task<ArticleDetailsResponseModel> Details([FromRoute] int id)
            => await this.articleService.Details<ArticleDetailsResponseModel>(id);

        [HttpPut]
        [Authorize]
        [Route(Id)]
        public async Task<ActionResult<InputArticleResponseModel>> Update(
            [FromRoute] int id,
            [FromBody] InputArticleRequestModel inputModel)
        {
            var userId = this.currentUser.GetId();

            var result = await this.articleService.Update(
                id,
                inputModel.Title,
                inputModel.Content,
                userId);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return new InputArticleResponseModel { Id = id };
        }

        [HttpDelete]
        [Authorize]
        [Route(Id)]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var userId = this.currentUser.GetId();

            var result = await this.articleService.Delete(id, userId);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok();
        }

        [HttpGet]
        [Authorize]
        [Route("Mine/Count")]
        public async Task<int> GetArticlesCountByCurrentUser() =>
            await this.articleService.AllArticlesCountByUserId(this.User.GetId());

        [HttpGet]
        [Route("{ArticleId}/Comments")]
        public async Task<IEnumerable<CommentListingModel>> GetCommentByArticle([FromRoute] int articleId)
            => await this.articleService.GetAllCommentsByArticleId<CommentListingModel>(articleId);
    }
}
