namespace MyBlog.Server.Data.Repositories
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using MyBlog.Server.Data.Repositories.Contracts;

    public class EfRepository<TEntity> : IRepository<TEntity>
        where TEntity : class
    {
        public EfRepository(MyBlogDbContext dbContext)
        {
            this.Context = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this.DbSet = this.Context.Set<TEntity>();
        }

        protected DbSet<TEntity> DbSet { get; set; }

        protected MyBlogDbContext Context { get; set; }

        public virtual IQueryable<TEntity> All() => this.DbSet;

        public virtual IQueryable<TEntity> AllAsNoTracking() => this.All().AsNoTracking();

        public virtual async Task<TEntity> GetByIdAsync(params object[] id) => await this.DbSet.FindAsync(id);

        public async Task AddAsync(TEntity entity) => await this.DbSet.AddAsync(entity);

        public void Update(TEntity entity)
        {
            var entry = this.Context.Entry(entity);
            if (entry.State == EntityState.Detached)
            {
                this.DbSet.Attach(entity);
            }

            entry.State = EntityState.Modified;
        }

        public virtual void Delete(TEntity entity) => this.DbSet.Remove(entity);

        public async Task<int> SaveChangesAsync() => await this.Context.SaveChangesAsync();

        public void Dispose()
        {
            this.Context?.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
