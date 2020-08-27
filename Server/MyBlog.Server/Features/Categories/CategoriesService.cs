using Microsoft.EntityFrameworkCore;

namespace MyBlog.Server.Features.Categories
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using MyBlog.Server.Data.Models;
    using MyBlog.Server.Data.Repositories.Contracts;
    using MyBlog.Server.Infrastructure.Mapping;

    public class CategoriesService : ICategoriesService
    {
        private readonly IRepository<Category> categoriesRepository;

        public CategoriesService(IRepository<Category> categoriesRepository)
        {
            this.categoriesRepository = categoriesRepository;
        }

        public async Task<IEnumerable<TModel>> All<TModel>() =>
            await this.categoriesRepository
                .All()
                .To<TModel>()
                .ToListAsync();
    }
}
