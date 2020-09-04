namespace MyBlog.Server.Features.Tags
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ITagsService
    {
        Task<IEnumerable<TModel>> AllAsync<TModel>();

        Task<int> GetIdByNameAsync(string tagName);

        Task<int> AddAsync(string tagName);
    }
}
