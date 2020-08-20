namespace MyBlog.Server.Data.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    using MyBlog.Server.Data.Models;

    public class VoteConfiguration : IEntityTypeConfiguration<Vote>
    {
        public void Configure(EntityTypeBuilder<Vote> builder)
        {
            builder
                .HasOne(v => v.Article)
                .WithMany(a => a.Votes)
                .HasForeignKey(v => v.ArticleId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
