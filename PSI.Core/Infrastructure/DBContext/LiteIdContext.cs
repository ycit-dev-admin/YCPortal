using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PSI.Core.Entities;
using PSI.Core.Entities.EntityConfigurations;
using PSI.Core.Entities.Identity;

namespace PSI.Core.Infrastructure.DBContext
{
    public class LiteIdContext : IdentityDbContext<AppUser>
    {
        private readonly DbContextOptions _options;
        public LiteIdContext(DbContextOptions options) : base(options)
        {
            _options = options;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //this.SeedUsers(modelBuilder);
            //this.SeedUserRoles(modelBuilder);




            modelBuilder.Entity<AppUser>().HasData(new AppUser
            {
                Id = "a035b649-e018-449f-bd6d-eba3aec5a117",
                UserName = "waynelee",
                NormalizedUserName = "WAYNELEE",
                Email = "waynelee@yc.com",
                NormalizedEmail = "WAYNELEE@YC.COM",
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

        private void SeedUsers(ModelBuilder builder)
        {

            var appUser = new AppUser
            {
                Id = "a035b649-e018-449f-bd6d-eba3aec5a117",
                Email = "waynelee@yc.com",
                NormalizedEmail = "WAYNELEE@YC.COM",
                EmailConfirmed = true,
                LockoutEnabled = true,
                UserName = "waynelee",
                NormalizedUserName = "WAYNELEE"
            };

            PasswordHasher<AppUser> passwordHasher = new PasswordHasher<AppUser>();
            passwordHasher.HashPassword(appUser, "27588138");
            builder.Entity<AppUser>().HasData(appUser);
        }

        private void SeedRoles(ModelBuilder builder)
        {
            builder.Entity<IdentityRole>().HasData(
                new IdentityRole()
                {
                    Id = "fab4fac1-c546-41de-aebc-a14da6895711",
                    Name = "Admin",
                    ConcurrencyStamp = "fab4fac1-c546-41de-aebc-a14da6895711",
                    NormalizedName = "ADMIN"
                }
                //, new IdentityRole() { Id = "c7b013f0-5201-4317-abd8-c211f91b7330", Name = "HR", ConcurrencyStamp = "2", NormalizedName = "Human Resource" }
                );
        }

        private void SeedUserRoles(ModelBuilder builder)
        {
            builder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string>() { RoleId = "fab4fac1-c546-41de-aebc-a14da6895711", UserId = "a035b649-e018-449f-bd6d-eba3aec5a117" }
                );
        }


        ////public IdentityContext(DbContextOptions<IdentityContext> options) : base(options)
        ////{
        ////}
        //private readonly DbContextOptions _options;

        //protected override void OnConfiguring(DbContextOptionsBuilder options)
        // => options.UseSqlite("Data Source=psiDev.db");

        //public LiteIdContext(DbContextOptions options) : base(options)
        //{
        //    _options = options;
        //}

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);

        //}
    }
}
