namespace MyBlog.Server.Infrastructure
{
    public class RoutesConstants
    {
        public class Articles
        {
            public const string Id = "{id}";

            public const string MineArticles = "Mine";

            public const string MineArticlesCount = "Mine/Count";

            public const string CommentsByArticleId = "{ArticleId}/Comments";
        }

        public const string Username = "{username}";


        public const string Count = "Count";
    }
}
