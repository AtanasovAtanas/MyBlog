namespace MyBlog.Server.Features.Categories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
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
    }
}
