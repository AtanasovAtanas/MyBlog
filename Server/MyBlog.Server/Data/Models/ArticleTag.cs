namespace MyBlog.Server.Data.Models
{
    using MyBlog.Server.Data.Models.Base;

    public class ArticleTag : DeletableEntity
    {
        public int ArticleId { get; set; }

        public virtual Article Article { get; set; }

        public int TagId { get; set; }

        public virtual Tag Tag { get; set; }
    }
}
