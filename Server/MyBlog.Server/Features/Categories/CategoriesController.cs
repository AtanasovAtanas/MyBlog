namespace MyBlog.Server.Features.Categories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using MyBlog.Server.Features.Articles.Models;
    using MyBlog.Server.Features.Categories.Models;

    public class CategoriesController : ApiController
    {
        private readonly ICategoriesService categoriesService;

        public CategoriesController(ICategoriesService categoriesService)
        {
            this.categoriesService = categoriesService;
        }

        [HttpGet]
        public async Task<IEnumerable<CategoryListingModel>> All() =>
            await this.categoriesService.All<CategoryListingModel>();

        [HttpGet]
        [Route("{CategoryName}")]
        public async Task<IEnumerable<ArticleDetailsResponseModel>> AllByName(
            [FromRoute] string categoryName,
            [FromQuery] int? page,
            [FromQuery] string filter)
        {
            if (page == null)
            {
                page = 1;
            }

            return await this.categoriesService.AllByName<ArticleDetailsResponseModel>(
                 categoryName,
                 page.Value,
                 filter);
        }
    }
}
