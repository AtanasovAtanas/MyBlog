namespace MyBlog.Server.Data.Seeding
{
    using System;
    using System.Threading.Tasks;

    using MyBlog.Server.Data.Models;

    public class TagsSeeder : ISeeder
    {
        public async Task SeedAsync(MyBlogDbContext dbContext, IServiceProvider serviceProvider)
        {
            var tags = new[]
            {
                new Tag { Name = "Tier 1", },
                new Tag { Name = "Tier 2" },
                new Tag { Name = "Tier 3" },
                new Tag { Name = "Tier 4" },
                new Tag { Name = "Official" },
                new Tag { Name = "Discussion" },
            };

            await dbContext.Tags.AddRangeAsync(tags);
            await dbContext.SaveChangesAsync();
        }
    }
}
