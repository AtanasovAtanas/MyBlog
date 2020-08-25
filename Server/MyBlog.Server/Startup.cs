namespace MyBlog.Server
{
    using System.Reflection;

    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using MyBlog.Server.Data;
    using MyBlog.Server.Data.Seeding;
    using MyBlog.Server.Infrastructure.Extensions;
    using MyBlog.Server.Infrastructure.Mapping;

    public class Startup
    {
        public Startup(IConfiguration configuration) => this.Configuration = configuration;

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
            => services
                .AddDatabase(this.Configuration)
                .AddIdentity()
                .AddJwtAuthentication(services.GetApplicationSettings(this.Configuration))
                .AddApplicationServices()
                .AddSwagger()
                .AddApiControllers();

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                using (var serviceScope = app.ApplicationServices.CreateScope())
                {
                    var dbContext = serviceScope
                        .ServiceProvider
                        .GetRequiredService<MyBlogDbContext>();

                    dbContext.Database.EnsureDeleted();
                    dbContext.Database.Migrate();

                    new ApplicationDbContextSeeder()
                        .SeedAsync(dbContext, serviceScope.ServiceProvider)
                        .GetAwaiter()
                        .GetResult();
                }
            }

            AutoMapperConfig.RegisterMappings(typeof(Program).GetTypeInfo().Assembly);

            app
                .UseSwaggerUI()
                .UseRouting()
                .UseCors(options => options
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod())
                .UseAuthentication()
                .UseAuthorization()
                .UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                })
                .ApplyMigrations();
        }
    }
}
