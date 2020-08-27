namespace MyBlog.Server.Features.Categories.Models
{
    using MyBlog.Server.Data.Models;
    using MyBlog.Server.Infrastructure.Mapping;

    public class CategoryListingModel : IMapFrom<Category>
    {
        public string Title { get; set; }

        public string Description { get; set; }
    }
}
