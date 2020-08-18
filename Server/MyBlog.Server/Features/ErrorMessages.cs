namespace MyBlog.Server.Features
{
    public class ErrorMessages
    {
        public class Articles
        {
            public const string InvalidUpdateByNonAuthor = "The article can be edited only by the author!";

            public const string InvalidDeletionByNonAuthor = "An article can be deleted only by the author!";
        }
    }
}
