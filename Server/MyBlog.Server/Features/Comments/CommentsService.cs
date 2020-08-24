namespace MyBlog.Server.Features.Comments
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Ganss.XSS;
    using Microsoft.EntityFrameworkCore;
    using MyBlog.Server.Data.Models;
    using MyBlog.Server.Data.Repositories.Contracts;
    using MyBlog.Server.Features.Comments.Models;
    using MyBlog.Server.Infrastructure.Mapping;
    using MyBlog.Server.Infrastructure.Services;

    public class CommentsService : ICommentsService
    {
        private readonly HtmlSanitizer htmlSanitizer;
        private readonly IDeletableEntityRepository<Comment> commentsRepository;

        public CommentsService(IDeletableEntityRepository<Comment> commentsRepository)
        {
            this.commentsRepository = commentsRepository;

            this.htmlSanitizer = new HtmlSanitizer();
        }

        public async Task<IEnumerable<TModel>> GetAllRepliesByCommentId<TModel>(int commentId)
        {
            return await this.commentsRepository
                .All()
                .Where(c => c.Id == commentId)
                .SelectMany(c => c.Replies)
                .Where(r => !r.IsDeleted)
                .To<TModel>()
                .ToListAsync();
        }

        public async Task<TModel> GetById<TModel>(int commentId) =>
            await this.commentsRepository
                .All()
                .Where(c => c.Id == commentId)
                .To<TModel>()
                .FirstOrDefaultAsync();

        public async Task<int> CreateAsync(int articleId, int? parentId, string content, string authorId)
        {
            var comment = new Comment
            {
                ArticleId = articleId,
                ParentId = parentId,
                Content = this.htmlSanitizer.Sanitize(content),
                AuthorId = authorId,
            };

            await this.commentsRepository.AddAsync(comment);
            await this.commentsRepository.SaveChangesAsync();

            return comment.Id;
        }

        public async Task<Result> Update(int commentId, string authorId, string content)
        {
            var comment = await this.commentsRepository.GetByIdAsync(commentId);

            if (comment == null)
            {
                return "Non-existing comment.";
            }

            if (comment.AuthorId != authorId)
            {
                return "Only the author can edit its comment.";
            }

            comment.Content = this.htmlSanitizer.Sanitize(content);

            this.commentsRepository.Update(comment);
            await this.commentsRepository.SaveChangesAsync();

            return true;
        }

        public async Task<Result> Delete(int commentId, string authorId)
        {
            var comment = await this.commentsRepository.GetByIdAsync(commentId);

            if (comment == null)
            {
                return "You can't delete a non-existing comment.";
            }

            if (comment.AuthorId != authorId)
            {
                return "Only the author can delete its comment.";
            }

            this.commentsRepository.Delete(comment);
            await this.commentsRepository.SaveChangesAsync();

            return true;
        }
    }
}
