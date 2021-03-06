﻿namespace MyBlog.Server.Data.Seeding
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using MyBlog.Server.Data.Models;

    public class ArticlesSeeder : ISeeder
    {
        public async Task SeedAsync(MyBlogDbContext dbContext, IServiceProvider serviceProvider)
        {
            var user = await dbContext
                .Users
                .Where(u => u.UserName == "AtanasAtanasov")
                .FirstOrDefaultAsync();

            var categories = await dbContext
                .Categories
                .Select(c => c.Id)
                .ToListAsync();

            var random = new Random();

            var articles = new List<Article>();

            for (int i = 0; i < 20; i++)
            {
                var categoryId = categories[random.Next(categories.Count)];

                var article = new Article
                {
                    Title = $"Lorem Ipsum {i + 1}",
                    Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar lorem bibendum, porta justo vel, tempor est. Sed nec pharetra erat. Nulla placerat sit amet turpis eget rhoncus. Cras quis arcu in libero eleifend cursus. Donec eu turpis quam. Sed libero turpis, varius non metus eget, finibus lacinia mauris. Aliquam nec dignissim mauris. Nullam in elit vel est varius mattis non eu nunc. Donec lobortis augue urna, quis efficitur neque aliquet et. Praesent tortor arcu, egestas a nulla non, suscipit venenatis erat. Integer euismod molestie massa vitae euismod. Nullam sed erat at justo laoreet luctus. Aenean ac turpis quis diam dignissim bibendum feugiat et nibh. Cras a orci dolor. Curabitur lectus ipsum, luctus ut dui eu, porttitor fermentum justo. Aliquam blandit nisi orci, sed sollicitudin tellus scelerisque quis.Morbi congue malesuada augue, et posuere metus bibendum sed. Etiam sollicitudin rutrum sapien nec commodo. Pellentesque vitae magna et lacus dignissim consequat sit amet et felis. Maecenas pharetra, eros quis faucibus porta, mi metus consectetur dui, vel feugiat magna massa ut velit. Ut tristique, dui et ornare vehicula, augue justo pretium quam, finibus mattis orci elit nec est. Donec at felis erat. Aliquam risus mauris, vestibulum quis sodales ut, viverra a neque.Nulla maximus fringilla felis quis pellentesque. Aenean sed suscipit ipsum. Cras at dolor ac dolor imperdiet vehicula et nec lacus. Nullam magna magna, fringilla sit amet porttitor a, laoreet vel massa. Donec congue turpis sit amet euismod venenatis. Donec orci augue, convallis sed ante ut, auctor tempor est. Aenean id dictum orci, a convallis ligula. Cras non vehicula dui. Cras luctus, lorem quis suscipit pellentesque, enim sapien consectetur augue, in ornare felis dolor consequat neque. Suspendisse iaculis rhoncus nulla, sed tincidunt eros vulputate id. Suspendisse tristique leo lacus, vitae auctor felis eleifend vel. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas velit est, elementum a nunc vitae, dignissim laoreet tellus. Integer eu nisl quis augue accumsan pulvinar eu vel purus.Vestibulum at urna eget urna ullamcorper euismod. Nunc molestie eleifend tincidunt. Quisque dapibus sit amet velit et consectetur. Nulla facilisi. Vivamus imperdiet nulla lobortis purus hendrerit, faucibus semper tortor semper. Aenean mattis felis ipsum, vitae hendrerit nulla finibus eget. Duis eu odio rhoncus arcu finibus hendrerit vitae a sem. Morbi quis ante massa. Sed fringilla mauris sed est hendrerit, sed lacinia urna tempor. Sed mattis erat tempor malesuada convallis. Sed euismod, odio at aliquam tincidunt, ex mauris imperdiet sapien, eget blandit urna urna imperdiet erat. Suspendisse vitae justo erat. Aenean in volutpat erat. Vestibulum fringilla sagittis volutpat.Sed aliquet felis vel nulla dictum dapibus. Morbi congue eu neque nec euismod. Proin tincidunt massa vel est tincidunt viverra. Nunc sit amet est id elit fringilla ullamcorper vitae tincidunt lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin sit amet felis orci. Donec lacinia ut turpis a pellentesque. Aenean nec lacus ac sem bibendum dignissim. Mauris tincidunt non felis a laoreet. Nam a elementum nulla, in mollis tellus. Sed consectetur congue nisl eget efficitur. Donec vitae nibh eu odio auctor feugiat eu sed augue.In eu tortor varius, ornare erat sed, commodo nunc. Sed quis enim sagittis, pretium magna a, lacinia quam. Phasellus urna enim, venenatis vitae dolor vitae, elementum dignissim leo. Cras purus ante, malesuada a dui at, gravida pellentesque nisl. Vestibulum imperdiet mauris sem, in mollis elit suscipit ac. In eu tellus a metus tempor tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut convallis risus enim, eu fringilla enim suscipit eget. Aenean condimentum eget sapien luctus condimentum. Ut aliquam lectus non consectetur sollicitudin. Mauris quis lacus suscipit, luctus elit quis, finibus magna. Aliquam erat volutpat. Fusce leo dolor, suscipit tincidunt nibh eu, iaculis ultricies augue. Nulla nec lectus sodales, bibendum mauris sit amet, consequat ante. Morbi nisl enim, pellentesque non nunc vitae, venenatis imperdiet nisl. Aliquam vel metus vulputate, fringilla felis sit amet, ornare nunc.Vivamus volutpat, sapien semper lacinia aliquet, mauris nisi ultrices dui, vel lacinia justo mauris id nisl. Suspendisse vel mi vitae ligula eleifend tristique a ut libero. Vivamus non fringilla leo. Duis consequat leo in sapien imperdiet mattis. Morbi fermentum facilisis eros at sollicitudin. Ut non nisl sapien. Suspendisse et massa rhoncus nibh rhoncus scelerisque. Phasellus ac varius massa. Vestibulum eu metus ornare, congue diam id, lacinia mauris. Aliquam at elit auctor, lacinia purus tristique, rutrum arcu. Phasellus id nisi id nunc finibus vulputate. Mauris quis suscipit ex. Ut id sapien nulla. Donec fringilla, orci et feugiat ultrices, arcu dolor congue neque, ultrices pharetra dui ex ut turpis.In semper laoreet arcu a condimentum. Curabitur ullamcorper nisi sit amet egestas posuere. Duis sed lacus vitae velit porta porttitor. Fusce convallis, arcu sit amet maximus malesuada, diam mauris congue lorem, ac blandit erat odio in libero. Sed vehicula sapien risus, a mollis quam lobortis ut. Ut id dui et nisi efficitur vulputate. Etiam orci sem, semper quis sapien sed, consequat volutpat metus. Fusce quis scelerisque odio, in aliquam dui.Etiam pharetra, orci et fermentum vestibulum, quam leo venenatis dolor, eleifend bibendum libero velit vel nunc. Maecenas posuere congue metus sed dignissim. Fusce vitae quam lobortis, pulvinar massa non, facilisis ante. Donec a nisi luctus, volutpat lacus ac, convallis mauris. Phasellus libero nisi, blandit venenatis rhoncus vitae, consectetur vel libero. Nullam id efficitur ante. Pellentesque congue placerat porttitor. Fusce a purus justo. Sed posuere ipsum id sapien efficitur, ut consequat augue sagittis. In venenatis tincidunt ligula et sollicitudin. Praesent nibh massa, imperdiet sed mauris ut, vulputate consectetur arcu. Vivamus hendrerit nulla non pretium ultricies. Sed lobortis urna leo, nec semper arcu euismod sed.Praesent et faucibus ex. Pellentesque quis mi sed quam fringilla efficitur in quis metus. Vestibulum tristique erat et facilisis ornare. Sed quis leo est. Nam venenatis mattis lorem, in feugiat risus dignissim at. Aenean purus felis, tincidunt sit amet augue vitae, congue accumsan lacus. Aliquam fringilla vitae arcu a dapibus. Etiam eget cursus diam. Ut ac vehicula metus. Integer congue felis ac libero tempor, sed ultrices nulla molestie. Cras non pellentesque mi. Etiam venenatis felis mattis ex facilisis pulvinar. Fusce tristique neque quis metus faucibus sagittis. In vulputate urna id mauris imperdiet, in commodo elit varius.",
                    AuthorId = user.Id,
                    CategoryId = categoryId,
                };

                articles.Add(article);
            }

            await dbContext.Articles.AddRangeAsync(articles);
            await dbContext.SaveChangesAsync();
        }
    }
}
