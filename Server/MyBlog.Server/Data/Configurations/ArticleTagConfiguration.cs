namespace MyBlog.Server.Data.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    using MyBlog.Server.Data.Models;

    public class ArticleTagConfiguration : IEntityTypeConfiguration<ArticleTag>
    {
        public void Configure(EntityTypeBuilder<ArticleTag> modelBuilder)
        {
            modelBuilder
                .HasKey(at => new { at.ArticleId, at.TagId });

            modelBuilder
                .HasOne(at => at.Article)
                .WithMany(a => a.Tags)
                .HasForeignKey(at => at.ArticleId);

            modelBuilder
                .HasOne(at => at.Tag)
                .WithMany(t => t.Articles)
                .HasForeignKey(at => at.TagId);
        }
    }
}
