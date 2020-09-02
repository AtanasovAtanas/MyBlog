namespace MyBlog.Server.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using MyBlog.Server.Data.Models.Base;

    using static Validation.Articles;

    public class Article : DeletableEntity
    {
        public Article()
        {
            this.Votes = new HashSet<Vote>();
            this.Comments = new HashSet<Comment>();
            this.Tags = new HashSet<ArticleTag>();
        }

        [Key]
        public int Id { get; set; }

        [Required(AllowEmptyStrings = false)]
        [MaxLength(TitleMaxLength)]
        public string Title { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string Content { get; set; }

        [Required]
        public string AuthorId { get; set; }

        public virtual User Author { get; set; }

        [Required]
        public int CategoryId { get; set; }

        public virtual Category Category { get; set; }

        public virtual IEnumerable<Vote> Votes { get; set; }

        public virtual IEnumerable<Comment> Comments { get; set; }

        public virtual IEnumerable<ArticleTag> Tags { get; set; }
    }
}
