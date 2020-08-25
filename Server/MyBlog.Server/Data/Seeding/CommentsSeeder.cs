namespace MyBlog.Server.Data.Seeding
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using MyBlog.Server.Data.Models;

    public class CommentsSeeder : ISeeder
    {
        public async Task SeedAsync(MyBlogDbContext dbContext, IServiceProvider serviceProvider)
        {
            var articles = await dbContext
                .Articles
                .Select(a => a.Id)
                .ToListAsync();

            var commentUser = await dbContext
                .Users
                .FirstOrDefaultAsync(u => u.UserName == "AnnaSarambelieva");

            foreach (var articleId in articles)
            {
                await this.SeedComments(dbContext, articleId, commentUser.Id);
            }

            var comments = await dbContext
                .Comments
                .Select(c => new
                {
                    Id = c.Id,
                    ArticleId = c.ArticleId,
                })
                .ToListAsync();

            var replyUser = await dbContext
                .Users
                .FirstOrDefaultAsync(u => u.UserName == "AtanasAtanasov");

            foreach (var comment in comments)
            {
                await this.SeedReplies(
                    dbContext,
                    comment.ArticleId,
                    comment.Id,
                    replyUser.Id,
                    commentUser.Id);
            }
        }

        private async Task SeedComments(
            MyBlogDbContext dbContext,
            int articleId,
            string authorId)
        {
            var comments = new[]
            {
                    new Comment
                    {
                        ArticleId = articleId,
                        ParentId = null,
                        Content =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar lorem bibendum, porta justo vel, tempor est. Sed nec pharetra erat. Nulla placerat sit amet turpis eget rhoncus. Cras quis arcu in libero eleifend cursus. Donec eu turpis quam. Sed libero turpis, varius non metus eget, finibus lacinia mauris. Aliquam nec dignissim mauris. Nullam in elit vel est varius mattis non eu nunc. Donec lobortis augue urna, quis efficitur neque aliquet et. Praesent tortor arcu, egestas a nulla non, suscipit venenatis erat. Integer euismod molestie massa vitae euismod. Nullam sed erat at justo laoreet luctus. Aenean ac turpis quis diam dignissim bibendum feugiat et nibh. Cras a orci dolor. Curabitur lectus ipsum, luctus ut dui eu, porttitor fermentum justo. Aliquam blandit nisi orci, sed sollicitudin tellus scelerisque quis.",
                        AuthorId = authorId,
                    },
                    new Comment
                    {
                        ArticleId = articleId,
                        ParentId = null,
                        Content =
                            "Vestibulum at urna eget urna ullamcorper euismod. Nunc molestie eleifend tincidunt. Quisque dapibus sit amet velit et consectetur. Nulla facilisi. Vivamus imperdiet nulla lobortis purus hendrerit, faucibus semper tortor semper. Aenean mattis felis ipsum, vitae hendrerit nulla finibus eget. Duis eu odio rhoncus arcu finibus hendrerit vitae a sem. Morbi quis ante massa. Sed fringilla mauris sed est hendrerit, sed lacinia urna tempor.",
                        AuthorId = authorId,
                    },
            };

            await dbContext.Comments.AddRangeAsync(comments);
            await dbContext.SaveChangesAsync();
        }

        private async Task SeedReplies(
            MyBlogDbContext dbContext,
            int articleId,
            int commentId,
            string firstAuthorId,
            string secondAuthorId)
        {
            var reply = new Comment
            {
                ArticleId = articleId,
                ParentId = commentId,
                AuthorId = firstAuthorId,
                Content =
                    "Praesent et faucibus ex. Pellentesque quis mi sed quam fringilla efficitur in quis metus. Vestibulum tristique erat et facilisis ornare. Sed quis leo est. Nam venenatis mattis lorem, in feugiat risus dignissim at. Aenean purus felis, tincidunt sit amet augue vitae, congue accumsan lacus.",
                Replies = new List<Comment>
                {
                    new Comment
                    {
                        ArticleId = articleId,
                        AuthorId = secondAuthorId,
                        Content =
                            "Aliquam fringilla vitae arcu a dapibus. Etiam eget cursus diam. Ut ac vehicula metus. Integer congue felis ac libero tempor, sed ultrices nulla molestie. Cras non pellentesque mi. Etiam venenatis felis mattis ex facilisis pulvinar.",
                    },
                },
            };

            await dbContext.Comments.AddAsync(reply);
        }
    }
}
