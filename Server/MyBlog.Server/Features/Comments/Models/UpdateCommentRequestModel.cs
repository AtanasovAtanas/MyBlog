namespace MyBlog.Server.Features.Comments.Models
{
    using System.ComponentModel.DataAnnotations;

    public class UpdateCommentRequestModel
    {
        [Required(AllowEmptyStrings = false)]
        public string Content { get; set; }
    }
}
