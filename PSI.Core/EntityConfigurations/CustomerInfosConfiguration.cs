using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace PSI.Core.Entities.EntityConfigurations
{
    public class CustomerInfosConfiguration : IEntityTypeConfiguration<CustomerInfo>
    {
        public void Configure(EntityTypeBuilder<CustomerInfo> builder)
        {
            builder.Property(x => x.CompanyName).IsRequired();
            builder.Property(x => x.CustomerName).IsRequired();
            // builder.Property(x => x.TaxId).IsRequired();
            // builder.Property(x => x.PsiType).IsRequired().HasMaxLength(1); // 進出貨類別(1:進貨 2:出貨 3:Both)
            // builder.Property(x => x.IsEffective).IsRequired().HasMaxLength(1);
        }
    }
}
