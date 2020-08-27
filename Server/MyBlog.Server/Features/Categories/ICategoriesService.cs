namespace MyBlog.Server.Features.Categories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using MyBlog.Server.Features.Categories.Models;

    public interface ICategoriesService
    {
        Task<IEnumerable<TModel>> All<TModel>();
    }
}
