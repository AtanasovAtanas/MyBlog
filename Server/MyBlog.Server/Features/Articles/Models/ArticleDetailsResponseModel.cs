namespace MyBlog.Server.Features.Articles.Models
{
    using System;

    using MyBlog.Server.Data.Models;
    using MyBlog.Server.Infrastructure.Mapping;

    public class ArticleDetailsResponseModel : IMapFrom<Article>
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public DateTime CreatedOn { get; set; }

        public string AuthorUsername { get; set; }
    }
}
