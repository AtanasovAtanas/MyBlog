namespace MyBlog.Server.Features.Articles.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using AutoMapper;
    using MyBlog.Server.Data.Models;
    using MyBlog.Server.Features.Comments.Models;
    using MyBlog.Server.Infrastructure.Mapping;

    public class ArticleDetailsResponseModel : IMapFrom<Article>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public DateTime CreatedOn { get; set; }

        public string AuthorUsername { get; set; }

        public int Votes { get; set; }

        public int CommentsCount { get; set; }

        public virtual IEnumerable<CommentListingModel> Comments { get; set; }

        public virtual IEnumerable<string> Tags { get; set; }

        public virtual void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Article, ArticleDetailsResponseModel>()
                .ForMember(x => x.Votes, options =>
                {
                    options.MapFrom(a => a.Votes.Sum(v => (int)v.Type));
                })
                .ForMember(x => x.CommentsCount, options =>
                {
                    options.MapFrom(a => a.Comments.Count(c => !c.IsDeleted));
                })
                .ForMember(x => x.Tags, options =>
                {
                    options.MapFrom(a => a.Tags.Select(t => t.Tag.Name).ToList());
                })
                .ForMember(
                    x => x.Comments, options => options.Ignore());
        }
    }
}
