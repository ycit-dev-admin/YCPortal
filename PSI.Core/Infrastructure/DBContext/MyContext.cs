using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using PSI.Core.Entities;

namespace PSI.Core.Infrastructure.DBContext
{
    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> options) : base(options)
        {
        }
        public DbSet<PurchaseWeightNote> PurchaseWeightNotes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //base.OnModelCreating(modelBuilder);
            // base.OnModelCreating(modelBuilder);  ??
            // modelBuilder.Entity<PurchaseWeightNote>().ToTable("abc");  // 相依在 Microsoft.EntityFrameworkCore.Relational

            //modelBuilder.ApplyConfiguration(new PurchaseWeightNotesConfiguration());
            //modelBuilder.ApplyConfiguration(new ProductItemsConfiguration());
            //modelBuilder.ApplyConfiguration(new CustomerInfosConfiguration());
        }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseNpgsql(
        //        @"Host = 10.0.6.27; Port = 5432; Database = PSI_DATA; Username = postgres; Password = changeme");
        //}

        //public DbSet<PurchaseWeightNote> PurchaseWeightNotes { get; set; }





        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //    => optionsBuilder.UseNpgsql("Host=10.0.6.66;Database=testdb;Username=admin;Password=12345");
    }
}
