namespace MyBlog.Server.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    using MyBlog.Server.Data.Models.Base;

    public class Vote : Entity
    {
        [Key]
        public int Id { get; set; }

        public VoteType Type { get; set; }

        [Required]
        public string UserId { get; set; }

        public virtual User User { get; set; }

        public int ArticleId { get; set; }

        public virtual Article Article { get; set; }
    }
}
