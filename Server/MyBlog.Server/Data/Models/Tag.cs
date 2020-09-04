namespace MyBlog.Server.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using MyBlog.Server.Data.Models.Base;

    public class Tag : DeletableEntity
    {
        public Tag()
        {
            this.Articles = new HashSet<ArticleTag>();
        }

        [Key]
        public int Id { get; set; }

        [Required(AllowEmptyStrings = false)]
        [MinLength(3)]
        public string Name { get; set; }

        public virtual IEnumerable<ArticleTag> Articles { get; set; }
    }
}
