namespace MyBlog.Server.Features.Tags
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using MyBlog.Server.Data.Models;
    using MyBlog.Server.Data.Repositories.Contracts;
    using MyBlog.Server.Infrastructure.Mapping;

    public class TagsService : ITagsService
    {
        private readonly IDeletableEntityRepository<Tag> tagsRepository;

        public TagsService(IDeletableEntityRepository<Tag> tagsRepository)
        {
            this.tagsRepository = tagsRepository;
        }

        public async Task<IEnumerable<TModel>> AllAsync<TModel>()
            => await this.tagsRepository
                .All()
                .To<TModel>()
                .ToListAsync();

        public async Task<int> GetIdByNameAsync(string tagName)
            => await this.tagsRepository
                .All()
                .Where(t => t.Name == tagName)
                .Select(t => t.Id)
                .SingleOrDefaultAsync();

        public async Task<int> AddAsync(string tagName)
        {
            var tag = new Tag { Name = tagName };

            await this.tagsRepository.AddAsync(tag);
            await this.tagsRepository.SaveChangesAsync();

            return tag.Id;
        }
    }
}
