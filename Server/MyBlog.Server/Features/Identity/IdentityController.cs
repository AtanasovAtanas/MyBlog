using System;
using System.Linq;
using System.Security.Claims;
using MyBlog.Server.Infrastructure.Extensions;

namespace MyBlog.Server.Features.Identity
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using MyBlog.Server.Data.Models;
    using MyBlog.Server.Features.Identity.Models;

    public class IdentityController : ApiController
    {
        private readonly UserManager<User> userManager;
        private readonly IIdentityService identity;
        private readonly AppSettings appSettings;

        public IdentityController(
            UserManager<User> userManager,
            IIdentityService identity,
            IOptions<AppSettings> appSettings)
        {
            this.userManager = userManager;
            this.identity = identity;
            this.appSettings = appSettings.Value;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route(nameof(Register))]
        public async Task<ActionResult<LoginResponseModel>> Register(RegisterRequestModel model)
        {
            var user = new User
            {
                Email = model.Email,
                UserName = model.UserName,
            };

            var result = await this.userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                return this.BadRequest(result.Errors);
            }

            var loginRequestModel = new LoginRequestModel
            {
                Password = model.Password,
                UserName = model.UserName,
            };

            return await this.Login(loginRequestModel);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route(nameof(Login))]
        public async Task<ActionResult<LoginResponseModel>> Login(LoginRequestModel model)
        {
            var user = await this.userManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                return this.Unauthorized();
            }

            var passwordValid = await this.userManager.CheckPasswordAsync(user, model.Password);
            if (!passwordValid)
            {
                return this.Unauthorized();
            }

            var token = this.identity.GenerateJwtToken(
                user.Id,
                user.UserName,
                this.appSettings.Secret);

            return new LoginResponseModel
            {
                UserId = user.Id,
                Username = user.UserName,
                Token = token,
            };
        }

        [HttpGet]
        [Authorize]
        public ActionResult<LoginResponseModel> GetUserDetails()
        {
            var userId = this.User.GetId();
            var username = this.User.Identity.Name;

            return new LoginResponseModel
            {
                UserId = userId,
                Username = username,
                Token = this.identity.GenerateJwtToken(userId, username, this.appSettings.Secret),
            };
        }
    }
}
