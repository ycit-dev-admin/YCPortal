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
    public class LiteContext : DbContext
    {
        public LiteContext(DbContextOptions<LiteContext> options) : base(options)
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
        public DbSet<SalesIngredient> SalesIngredients { get; set; }
        public DbSet<SalesWeightNote> SalesWeightNotes { get; set; }
        public DbSet<SalesWeightNoteStepData> SalesWeightNotesStepDatas { get; set; }
        public DbSet<P_Inventory> P_Inventory { get; set; }
        public DbSet<PS_WreteOff_Record> PS_WreteOff_Record { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
          => options.UseSqlite("Data Source=psiDev.db");
    }
}
