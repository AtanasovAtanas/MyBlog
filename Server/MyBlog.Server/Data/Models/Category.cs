namespace MyBlog.Server.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using MyBlog.Server.Data.Models.Base;

    public class Category : DeletableEntity
    {
        public Category()
        {
            this.Articles = new HashSet<Article>();
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(15, ErrorMessage = "Title can't be longer than 15 symbols")]
        [MinLength(5, ErrorMessage = "Title must be at least 5 characters long")]
        public string Title { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string Description { get; set; }

        [Required]
        [MinLength(10)]
        public string ImageUrl { get; set; }

        public virtual IEnumerable<Article> Articles { get; set; }
    }
}
