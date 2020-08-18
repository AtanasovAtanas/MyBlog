namespace MyBlog.Server.Features.Articles.Models
{
    using MyBlog.Server.Data.Models;
    using MyBlog.Server.Infrastructure.Mapping;

    public class ArticleDetailsResponseModel : IMapFrom<Article>
    {
        public string Title { get; set; }

        public string Content { get; set; }

        public string CreatedOn { get; set; }

        public string AuthorUsername { get; set; }
    }
}
