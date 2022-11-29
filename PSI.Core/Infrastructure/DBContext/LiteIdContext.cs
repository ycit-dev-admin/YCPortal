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
