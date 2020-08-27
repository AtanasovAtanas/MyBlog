namespace MyBlog.Server.Features.Categories
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using MyBlog.Server.Data.Models;
    using MyBlog.Server.Data.Repositories.Contracts;
    using MyBlog.Server.Infrastructure.Mapping;

    using static Constants;

    public class CategoriesService : ICategoriesService
    {
        private readonly IDeletableEntityRepository<Category> categoriesRepository;

        public CategoriesService(IDeletableEntityRepository<Category> categoriesRepository)
        {
            this.categoriesRepository = categoriesRepository;
        }

        public async Task<IEnumerable<TModel>> All<TModel>() =>
            await this.categoriesRepository
                .All()
                .To<TModel>()
                .ToListAsync();

        public async Task<IEnumerable<TModel>> AllByName<TModel>(
            string categoryName,
            int page,
            string filter)
        {
            var query = this.categoriesRepository
                .All()
                .Where(c => c.Title == categoryName)
                .SelectMany(c => c.Articles);

            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(a =>
                    a.Title.Contains(filter) ||
                    a.Content.Contains(filter));
            }

            return await query
                .Skip((page - 1) * ArticlesPerPage)
                .Take(ArticlesPerPage)
                .OrderByDescending(a => a.CreatedOn)
                .To<TModel>()
                .ToListAsync();
        }

        public async Task<int> CountByName(string categoryName, string filter)
        {
            var query = this.categoriesRepository
                .All()
                .Where(a => a.Title == categoryName)
                .SelectMany(c => c.Articles);

            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(a =>
                    a.Title.Contains(filter) ||
                    a.Content.Contains(filter));
            }

            return await query.CountAsync();
        }
    }
}
