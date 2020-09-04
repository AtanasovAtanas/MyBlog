namespace MyBlog.Server.Infrastructure
{
    public class RoutesConstants
    {
        public class Common
        {
            public const string Id = "{id}";
        }

        public class Articles
        {
            public const string MineArticles = "Mine";

            public const string MineArticlesCount = "Mine/Count";

            public const string CommentsByArticleId = "{ArticleId}/Comments";
        }

        public class Categories
        {
            public const string CategoryName = "{CategoryName}";

            public const string ArticlesCountByCategory = "{CategoryName}/Articles/Count";
        }
    }
}
