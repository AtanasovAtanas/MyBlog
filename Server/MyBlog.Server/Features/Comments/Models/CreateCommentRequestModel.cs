namespace MyBlog.Server.Features.Comments.Models
{
    using System.ComponentModel.DataAnnotations;

    public class CreateCommentRequestModel
    {
        [Required]
        public int ArticleId { get; set; }

        public int? ParentId { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string Content { get; set; }
    }
}
