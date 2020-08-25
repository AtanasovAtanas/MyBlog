namespace MyBlog.Server.Data.Seeding
{
    using System;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.DependencyInjection;
    using MyBlog.Server.Data.Models;

    public class UserSeeder : ISeeder
    {
        public async Task SeedAsync(MyBlogDbContext dbContext, IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

            var users = new[]
            {
                new User
                {
                    Email = "a.atanasov@gmail.com",
                    UserName = "AtanasAtanasov",
                },
                new User
                {
                    Email = "a.sarambelieva@gmail.com",
                    UserName = "AnnaSarambelieva",
                },
            };

            foreach (var user in users)
            {
                var result = await userManager
                    .CreateAsync(
                        user,
                        "123456");

                if (!result.Succeeded)
                {
                    throw new InvalidOperationException(
                        string.Join(
                            Environment.NewLine,
                            result.Errors));
                }
            }
        }
    }
}
