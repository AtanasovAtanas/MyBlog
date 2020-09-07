namespace MyBlog.Server.Features.Articles.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using AutoMapper;
    using MyBlog.Server.Data.Models;
    using MyBlog.Server.Infrastructure.Mapping;

    public class ArticleSummaryDetailsResponseModel : IMapFrom<Article>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public DateTime CreatedOn { get; set; }

        public string AuthorUsername { get; set; }

        public int Votes { get; set; }

        public int CommentsCount { get; set; }

        public virtual IEnumerable<string> Tags { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Article, ArticleSummaryDetailsResponseModel>()
                .ForMember(x => x.Votes, options =>
                {
                    options.MapFrom(a => a.Votes.Sum(v => (int)v.Type));
                })
                .ForMember(x => x.CommentsCount, options =>
                {
                    options.MapFrom(a => a.Comments.Count(c => !c.IsDeleted));
                })
                .ForMember(x => x.Content, options =>
                {
                    options.MapFrom(a =>
                        a.Content.Substring(0, 1000) + "...");
                })
                .ForMember(x => x.Tags, options =>
                {
                    options.MapFrom(a => a.Tags.Select(t => t.Tag.Name).ToList());
                });
        }
    }
}
