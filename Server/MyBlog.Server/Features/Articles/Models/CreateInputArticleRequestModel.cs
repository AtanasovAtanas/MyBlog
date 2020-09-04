namespace MyBlog.Server.Features.Articles.Models
{
    using System.ComponentModel.DataAnnotations;

    public class CreateInputArticleRequestModel : InputArticleRequestModel
    {
        [Required]
        public string CategoryName { get; set; }
    }
}
