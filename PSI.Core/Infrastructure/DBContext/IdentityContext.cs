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

        }
    }
}
