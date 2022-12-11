using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using PSI.Core.Entities;
using PSI.Core.Entities.EntityConfigurations;

namespace PSI.Core.Infrastructure.DBContext
{
    public class MyContextDev : DbContext
    {
        public MyContextDev(DbContextOptions<MyContextDev> options) : base(options)
        {
        }
        // Table要加S
        public DbSet<PurchaseWeightNote> PurchaseWeightNotes { get; set; }
        public DbSet<CustomerInfo> CustomerInfos { get; set; }
        public DbSet<ProductItem> ProductItems { get; set; }
        public DbSet<CustomerContract> CustomerContracts { get; set; }
        public DbSet<CustomerContractLog> CustomerContractLogs { get; set; }
        public DbSet<CustomerCar> CustomerCars { get; set; }
        public DbSet<CodeTable> CodeTables { get; set; }
        public DbSet<PurchaseIngredient> PurchaseIngredients { get; set; }
        public DbSet<SeqTypeConfig> SeqTypeConfigs { get; set; }
        public DbSet<S_WeightNote_Ingredient> S_WeightNotes_Ingredients { get; set; }
        public DbSet<S_WeightNote> S_WeightNotes { get; set; }
        public DbSet<SalesWeightNoteStepData> SalesWeightNotesStepDatas { get; set; }
        public DbSet<P_Inventory> P_Inventorys { get; set; }
        public DbSet<PS_WriteOff_Log> PS_WriteOff_Logs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // base.OnModelCreating(modelBuilder);  ??
            // modelBuilder.Entity<PurchaseWeightNote>().ToTable("abc");  // 相依在 Microsoft.EntityFrameworkCore.Relational

            modelBuilder.ApplyConfiguration(new CustomerInfosConfiguration());
            modelBuilder.ApplyConfiguration(new CodeTableConfiguration());
            //modelBuilder.ApplyConfiguration(new ProductItemsConfiguration());
            //modelBuilder.ApplyConfiguration(new CustomerInfosConfiguration());

            // https://www.learnentityframeworkcore.com/migrations/seeding
            //modelBuilder.Entity<P_Inventory>().HasData(new P_Inventory {  });
        }

        // 疑似取代.net framework 的DbEntityValidationException用法  https://entityframeworkcore.com/knowledge-base/46430619/-net-core-2---ef-core-error-handling-save-changes
        public override int SaveChanges()
        {
            var entities = from e in ChangeTracker.Entries()
                           where e.State == EntityState.Added
                               || e.State == EntityState.Modified
                           select e.Entity;
            foreach (var entity in entities)
            {
                var validationContext = new ValidationContext(entity);
                Validator.ValidateObject(entity, validationContext);
            }

            return base.SaveChanges();
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
