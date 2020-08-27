namespace MyBlog.Server.Data.Seeding
{
    using System;
    using System.Threading.Tasks;

    using MyBlog.Server.Data.Models;

    public class CategoriesSeeder : ISeeder
    {
        public async Task SeedAsync(MyBlogDbContext dbContext, IServiceProvider serviceProvider)
        {
            var categories = new[]
            {
                new Category
                {
                    Title = "Sport",
                    Description = "The football category. News, results and discussion about the beautiful game.",
                },
                new Category
                {
                    Title = "News",
                    Description = "Real news articles, primarily but not exclusively, news relating to the United States and the rest of the World.",
                },
                new Category
                {
                    Title = "Stocks",
                    Description = "Almost any post related to stocks is welcome here. Don't hesitate to tell us about a ticker we should know about, but read the sidebar rules before you post. Check out our wiki and Discord!",
                },
                new Category
                {
                    Title = "Cooking",
                    Description = "Cooking is a place for the cooks and those who want to learn how to cook. Post anything related to cooking here, within reason.",
                },
                new Category
                {
                    Title = "History",
                    Description = "History is a place for discussions about history. Feel free to submit interesting articles, tell us about this cool book you just read, or start a discussion.",
                },
                new Category
                {
                    Title = "Memes",
                    Description = "Memes! A way of describing cultural information being shared. An element of a culture or system of behavior that may be considered to be passed from one individual to another by nongenetic means, especially imitation.",
                },
            };

            await dbContext.Categories.AddRangeAsync(categories);
            await dbContext.SaveChangesAsync();
        }
    }
}
