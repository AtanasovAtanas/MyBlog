namespace MyBlog.Server.Features.Articles.Models
{
    using System.ComponentModel.DataAnnotations;

    using static Data.Validation.Articles;

    public class InputArticleRequestModel
    {
        [Required(AllowEmptyStrings = false)]
        [MaxLength(TitleMaxLength)]
        public string Title { get; set; }

        public string Content { get; set; }
    }
}
