namespace MyBlog.Server.Features.Categories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ICategoriesService
    {
        Task<IEnumerable<TModel>> All<TModel>();

        Task<IEnumerable<TModel>> AllByName<TModel>(
            string categoryName, int page, string filter, string sortBy);

        Task<int> CountByName(string categoryName, string filter);

        Task<int> GetIdByName(string categoryName);
    }
}
