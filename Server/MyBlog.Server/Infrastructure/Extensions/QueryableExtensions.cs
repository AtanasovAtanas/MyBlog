namespace MyBlog.Server.Infrastructure.Extensions
{
    using System.Linq;

    public static class QueryableExtensions
    {
        public static IQueryable<T> Page<T>(
            this IQueryable<T> enumerable,
            int page,
            int pageSize)
            => enumerable.Skip((page - 1) * pageSize).Take(pageSize);
    }
}
