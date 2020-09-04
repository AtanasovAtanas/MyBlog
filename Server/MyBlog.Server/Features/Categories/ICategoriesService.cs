namespace MyBlog.Server.Features.Categories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ICategoriesService
    {
        Task<IEnumerable<TModel>> GetAllAsync<TModel>();

        Task<IEnumerable<TModel>> GetAllByNameAsync<TModel>(
            string categoryName, int page, string filter, string sortBy);

        Task<int> GetCountByNameAsync(string categoryName, string filter);

        Task<int> GetIdByNameAsync(string categoryName);
    }
}
