namespace MyBlog.Server.Features.Articles.Models
{
    using System.Linq;

    using AutoMapper;
    using MyBlog.Server.Data.Models;

    public class ArticleSummaryDetailsResponseModel : ArticleDetailsResponseModel
    {
        public override void CreateMappings(IProfileExpression configuration)
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
