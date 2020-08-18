namespace MyBlog.Server.Data.Models
{
    using System;
    using System.Collections.Generic;

    using Microsoft.AspNetCore.Identity;
    using MyBlog.Server.Data.Models.Base;

    public class User : IdentityUser, IEntity
    {
        public User()
        {
            this.Articles = new HashSet<Article>();
        }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public string ModifiedBy { get; set; }

        public virtual IEnumerable<Article> Articles { get; set; }
    }
}
