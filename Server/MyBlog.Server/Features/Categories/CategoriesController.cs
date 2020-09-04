namespace MyBlog.Server.Features.Categories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using MyBlog.Server.Features.Articles.Models;
    using MyBlog.Server.Features.Categories.Models;

    using static MyBlog.Server.Infrastructure.RoutesConstants.Categories;

    public class CategoriesController : ApiController
    {
        private readonly ICategoriesService categoriesService;

        public CategoriesController(ICategoriesService categoriesService)
        {
            this.categoriesService = categoriesService;
        }

        [HttpGet]
        public async Task<IEnumerable<CategoryListingModel>> All() =>
            await this.categoriesService.GetAllAsync<CategoryListingModel>();

        [HttpGet]
        [Route(CategoryName)]
        public async Task<IEnumerable<ArticleSummaryDetailsResponseModel>> AllByName(
            [FromRoute] string categoryName,
            [FromQuery] int? page,
            [FromQuery] string filter,
            [FromQuery] string sortBy)
        {
            if (page == null)
            {
                page = 1;
            }

            return await this.categoriesService.GetAllByNameAsync<ArticleSummaryDetailsResponseModel>(
                 categoryName,
                 page.Value,
                 filter,
                 sortBy);
        }

        [HttpGet]
        [Route(ArticlesCountByCategory)]
        public async Task<CountByNameResponseModel> CountByName(
            [FromRoute] string categoryName,
            [FromQuery] string filter)
        {
            var count = await this.categoriesService.GetCountByNameAsync(categoryName, filter);

            return new CountByNameResponseModel { Count = count };
        }
    }
}
