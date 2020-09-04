namespace MyBlog.Server.Features.Articles.Models
{
    using System.ComponentModel.DataAnnotations;

    public class CreateRequestModel : ArticleInputRequestModel
    {
        [Required]
        public string CategoryName { get; set; }
    }
}
