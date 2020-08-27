namespace MyBlog.Server.Features.Articles.Models
{
    using System.ComponentModel.DataAnnotations;

    public class CreateArticleRequestModel : InputArticleRequestModel
    {
        [Required]
        public string CategoryName { get; set; }
    }
}
