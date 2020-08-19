namespace MyBlog.Server.Features.Articles
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using MyBlog.Server.Features.Articles.Models;
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
        public async Task<IEnumerable<ArticleDetailsResponseModel>> All()
            => await this.articleService.All<ArticleDetailsResponseModel>();

        [HttpGet]
        [Authorize]
        [Route("Mine")]
        public async Task<IEnumerable<ArticleDetailsResponseModel>> Mine()
        {
            var userId = this.User.GetId();

            var result =
               await this.articleService.AllByUserId<ArticleDetailsResponseModel>(userId);

            return result;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<InputArticleResponseModel>> Create(InputArticleRequestModel inputModel)
        {
            var userId = this.currentUser.GetId();

            var articleId = await this.articleService.AddAsync(
                   inputModel.Title,
                   inputModel.Content,
                   userId);

            return new InputArticleResponseModel { Id = articleId };
        }

        [HttpGet]
        [Route(Id)]
        public async Task<ArticleDetailsResponseModel> Details(int id)
            => await this.articleService.Details<ArticleDetailsResponseModel>(id);

        [HttpPut]
        [Authorize]
        [Route(Id)]
        public async Task<ActionResult<InputArticleResponseModel>> Update(
            int id,
            InputArticleRequestModel inputModel)
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
        public async Task<IActionResult> Delete(int id)
        {
            var userId = this.currentUser.GetId();

            var result = await this.articleService.Delete(id, userId);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok();
        }
    }
}
