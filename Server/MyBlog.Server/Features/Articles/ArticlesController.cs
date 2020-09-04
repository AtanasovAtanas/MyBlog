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

    using static Infrastructure.RoutesConstants.Articles;
    using static Infrastructure.RoutesConstants.Common;

    public class ArticlesController : ApiController
    {
        private readonly IArticlesService articlesService;
        private readonly ICurrentUserService currentUser;

        public ArticlesController(
            IArticlesService articlesService,
            ICurrentUserService currentUser)
        {
            this.articlesService = articlesService;
            this.currentUser = currentUser;
        }

        [HttpGet]
        [Authorize]
        [Route(MineArticles)]
        public async Task<IEnumerable<ArticleSummaryDetailsResponseModel>> Mine(
            [FromQuery] int? page, [FromQuery] string filter)
        {
            page ??= 1;
            var userId = this.User.GetId();

            var result =
               await this.articlesService.AllByUserId<ArticleSummaryDetailsResponseModel>(userId, page.Value, filter);

            return result;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<InputArticleResponseModel>> Create(
            [FromBody] CreateInputArticleRequestModel inputModel)
        {
            var userId = this.currentUser.GetId();

            var articleId = await this.articlesService.AddAsync(
                   inputModel.Title,
                   inputModel.Content,
                   inputModel.CategoryName,
                   inputModel.Tags,
                   userId);

            return new InputArticleResponseModel { Id = articleId };
        }

        [HttpGet]
        [Route(Id)]
        public async Task<ArticleDetailsResponseModel> Details([FromRoute] int id)
            => await this.articlesService.DetailsAsync<ArticleDetailsResponseModel>(id);

        [HttpPut]
        [Authorize]
        [Route(Id)]
        public async Task<ActionResult<InputArticleResponseModel>> Update(
            [FromRoute] int id,
            [FromBody] InputArticleRequestModel inputArticleModel)
        {
            var userId = this.currentUser.GetId();

            var result = await this.articlesService.UpdateAsync(
                id,
                inputArticleModel.Title,
                inputArticleModel.Content,
                inputArticleModel.Tags,
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

            var result = await this.articlesService.DeleteAsync(id, userId);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok();
        }

        [HttpGet]
        [Authorize]
        [Route(MineArticlesCount)]
        public async Task<int> GetArticlesCountByCurrentUser() =>
            await this.articlesService.GetAllArticlesCountByUserIdAsync(this.User.GetId());

        [HttpGet]
        [Route(CommentsByArticleId)]
        public async Task<IEnumerable<CommentListingModel>> GetCommentByArticle([FromRoute] int articleId)
            => await this.articlesService.GetAllCommentsByArticleIdAsync<CommentListingModel>(articleId);
    }
}
