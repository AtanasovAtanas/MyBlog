namespace MyBlog.Server.Features.Comments.Models
{
    using System;
    using System.Collections.Generic;

    using AutoMapper;
    using MyBlog.Server.Data.Models;
    using MyBlog.Server.Infrastructure.Mapping;

    public class CommentListingModel : IMapFrom<Comment>, IHaveCustomMappings
    {
        public CommentListingModel()
        {
            this.Replies = new List<CommentListingModel>();
        }

        public int Id { get; set; }

        public string Content { get; set; }

        public string AuthorUsername { get; set; }

        public DateTime CreatedOn { get; set; }

        public int? ParentId { get; set; }

        public virtual ICollection<CommentListingModel> Replies { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Comment, CommentListingModel>()
                .ForMember(x => x.Replies, options => options.Ignore());
        }
    }
}
