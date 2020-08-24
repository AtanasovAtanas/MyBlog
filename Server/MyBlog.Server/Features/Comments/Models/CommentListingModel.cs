namespace MyBlog.Server.Features.Comments.Models
{
    using System;

    using MyBlog.Server.Data.Models;
    using MyBlog.Server.Infrastructure.Mapping;

    public class CommentListingModel : IMapFrom<Comment>
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public string AuthorUsername { get; set; }

        public int RepliesCount { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}
