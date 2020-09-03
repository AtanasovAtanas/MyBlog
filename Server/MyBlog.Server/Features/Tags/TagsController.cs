namespace MyBlog.Server.Features.Tags
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using MyBlog.Server.Features.Tags.Models;

    public class TagsController : ApiController
    {
        private readonly ITagsService tagsService;

        public TagsController(ITagsService tagsService)
        {
            this.tagsService = tagsService;
        }

        [HttpGet]
        public async Task<IEnumerable<TagListingModel>> All()
            => await this.tagsService.AllAsync<TagListingModel>();
    }
}
