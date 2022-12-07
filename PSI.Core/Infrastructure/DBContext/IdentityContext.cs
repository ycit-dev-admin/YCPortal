using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PSI.Core.Entities;
using PSI.Core.Entities.EntityConfigurations;
using PSI.Core.Entities.Identity;

namespace PSI.Core.Infrastructure.DBContext
{
    public class IdentityContext : IdentityDbContext<AppUser>
    {
        //public IdentityContext(DbContextOptions<IdentityContext> options) : base(options)
        //{
        //}
        private readonly DbContextOptions _options;

        public IdentityContext(DbContextOptions options) : base(options)
        {
            _options = options;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<AppUser>().HasData(new AppUser
            {
                Id = "a035b649-e018-449f-bd6d-eba3aec5a117",
                UserName = "ycwayne",
                NormalizedUserName = "YCWAYNE",
                Email = "ycwayne@yc.com",
                NormalizedEmail = "YCWAYNE@YC.COM",
                EmailConfirmed = true,
                PasswordHash = "AQAAAAEAACcQAAAAEAbj60M2d59Q+tRgJf2+z4xBnFyufQUInySMKeOQm6RAiI9sS8J59fjNE9+DryaP7Q==",
                SecurityStamp = "XQETP2NFPURVTDGBIFTCQHZBACWA3HN3",
                ConcurrencyStamp = "a66c1a38-64f9-4339-a5f6-3b9973530c7e",
                PhoneNumberConfirmed = false,
                TwoFactorEnabled = false,
                LockoutEnabled = true,
                AccessFailedCount = 0,
                NICK_NAME = "管理員",
                FAC_SITE = "A",
                AUTHORITY_LEVEL = 0
            });
        }
    }
}
