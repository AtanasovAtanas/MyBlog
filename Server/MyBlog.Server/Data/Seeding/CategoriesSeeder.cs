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
                    ImageUrl = "https://images.unsplash.com/photo-1511204338744-5d4e9b3ffee0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=819&q=80",
                },
                new Category
                {
                    Title = "News",
                    Description = "Real news articles, primarily but not exclusively, news relating to the United States and the rest of the World.",
                    ImageUrl = "https://images.unsplash.com/photo-1497008386681-a7941f08011e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80",
                },
                new Category
                {
                    Title = "Stocks",
                    Description = "Almost any post related to stocks is welcome here. Don't hesitate to tell us about a ticker we should know about, but read the sidebar rules before you post. Check out our wiki and Discord!",
                    ImageUrl = "https://images.unsplash.com/photo-1587217997519-afded20ada5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
                },
                new Category
                {
                    Title = "Cooking",
                    Description = "Cooking is a place for the cooks and those who want to learn how to cook. Post anything related to cooking here, within reason.",
                    ImageUrl = "https://images.unsplash.com/photo-1449818841066-458e2db9db7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
                },
                new Category
                {
                    Title = "History",
                    Description = "History is a place for discussions about history. Feel free to submit interesting articles, tell us about this cool book you just read, or start a discussion.",
                    ImageUrl = "https://images.unsplash.com/photo-1562673005-7693bd6d6e54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=798&q=80",
                },
                new Category
                {
                    Title = "Memes",
                    Description = "Memes! A way of describing cultural information being shared. An element of a culture or system of behavior that may be considered to be passed from one individual to another by nongenetic means, especially imitation.",
                    ImageUrl = "https://images.unsplash.com/photo-1532054241088-402b4150db33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
                },
            };

            await dbContext.Categories.AddRangeAsync(categories);
            await dbContext.SaveChangesAsync();
        }
    }
}
