namespace MyBlog.Server.Features.Categories
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using MyBlog.Server.Data.Models;
    using MyBlog.Server.Data.Repositories.Contracts;
    using MyBlog.Server.Infrastructure.Extensions;
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
            string filter,
            string sortBy)
        {
            var query = this.categoriesRepository
                .All()
                .Where(c => c.Title == categoryName)
                .SelectMany(c => c.Articles)
                .Where(a => !a.IsDeleted);

            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(a =>
                    a.Title.Contains(filter) ||
                    a.Content.Contains(filter));
            }

            if (string.IsNullOrEmpty(sortBy))
            {
                sortBy = "newest";
            }

            switch (sortBy)
            {
                case "newest":
                    query = query.OrderByDescending(a => a.CreatedOn);
                    break;
                case "oldest":
                    query = query.OrderBy(a => a.CreatedOn);
                    break;
                case "comments":
                    query = query.OrderByDescending(a => a.Comments.Count());
                    break;
            }

            return await query
                .Page(page, ArticlesPerPage)
                .To<TModel>()
                .ToListAsync();
        }

        public async Task<int> CountByName(string categoryName, string filter)
        {
            var query = this.categoriesRepository
                .All()
                .Where(a => a.Title == categoryName)
                .SelectMany(c => c.Articles)
                .Where(a => !a.IsDeleted);

            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(a =>
                    a.Title.Contains(filter) ||
                    a.Content.Contains(filter));
            }

            return await query.CountAsync();
        }

        public async Task<int> GetIdByName(string categoryName) =>
            await this.categoriesRepository
                .All()
                .Where(c => c.Title.ToLower() == categoryName.ToLower())
                .Select(c => c.Id)
                .FirstOrDefaultAsync();
    }
}
