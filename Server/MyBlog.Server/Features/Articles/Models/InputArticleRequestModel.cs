namespace MyBlog.Server.Features.Articles.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using static Data.Validation.Articles;

    public class InputArticleRequestModel
    {
        [Required]
        [MaxLength(TitleMaxLength)]
        [MinLength(TitleMinLength)]
        public string Title { get; set; }

        [Required]
        [MinLength(ContentMinLength)]
        public string Content { get; set; }

        public virtual IEnumerable<string> Tags { get; set; }
    }
}
