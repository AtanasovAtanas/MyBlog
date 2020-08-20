namespace MyBlog.Server.Features.Votes.Models
{
    using MyBlog.Server.Data.Models;

    public class VoteRequestModel
    {
        public int ArticleId { get; set; }

        public VoteType VoteType { get; set; }
    }
}
