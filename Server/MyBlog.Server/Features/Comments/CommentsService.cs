﻿namespace MyBlog.Server.Features.Comments
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

        public async Task<IEnumerable<CommentListingModel>> GetAllCommentsWithRepliesByArticleId(int articleId)
        {
            var comments = await this.commentsRepository
                .All()
                .Where(c => c.ArticleId == articleId)
                .To<CommentListingModel>()
                .ToListAsync();

            foreach (var comment in comments)
            {
                var parent = comments
                    .FirstOrDefault(c => c.Id == comment.ParentId);

                parent?.Replies.Add(comment);
            }

            comments = comments
                .Where(c => c.ParentId == null)
                .ToList();

            return comments;
        }

        public async Task<TModel> GetByIdAsync<TModel>(int commentId) =>
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

        public async Task<Result> UpdateAsync(int commentId, string authorId, string content)
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

        public async Task<Result> DeleteAsync(int commentId, string authorId)
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

            await this.RemoveChildren(comment.Id);

            this.commentsRepository.Delete(comment);

            await this.commentsRepository.SaveChangesAsync();

            return true;
        }

        private async Task RemoveChildren(int commentId)
        {
            var children = await this.commentsRepository
                .All()
                .Where(c => c.ParentId == commentId)
                .ToListAsync();

            foreach (var child in children)
            {
                await this.RemoveChildren(child.Id);

                this.commentsRepository.Delete(child);
            }
        }
    }
}
