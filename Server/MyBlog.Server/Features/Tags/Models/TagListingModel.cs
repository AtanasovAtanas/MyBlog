namespace MyBlog.Server.Features.Tags.Models
{
    using MyBlog.Server.Data.Models;
    using MyBlog.Server.Infrastructure.Mapping;

    public class TagListingModel : IMapFrom<Tag>
    {
        public string Name { get; set; }
    }
}
