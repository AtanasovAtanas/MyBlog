namespace MyBlog.Server.Features.Identity.Models
{
    public class LoginResponseModel
    {
        public string Token { get; set; }

        public string UserId { get; set; }

        public string Username { get; set; }
    }
}
