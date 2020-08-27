namespace MyBlog.Server.Features.Categories.Models
{
    using System.Linq;

    using AutoMapper;

    using MyBlog.Server.Data.Models;
    using MyBlog.Server.Infrastructure.Mapping;

    public class CategoryListingModel : IMapFrom<Category>, IHaveCustomMappings
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public int ArticlesCount { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Category, CategoryListingModel>()
                .ForMember(x => x.ArticlesCount, options =>
                {
                    options.MapFrom(c =>
                        c.Articles.Count(a => !a.IsDeleted));
                });
        }
    }
}
