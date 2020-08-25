namespace MyBlog.Server.Data.Seeding
{
    using System;
    using System.Threading.Tasks;

    public interface ISeeder
    {
        Task SeedAsync(MyBlogDbContext dbContext, IServiceProvider serviceProvider);
    }
}
