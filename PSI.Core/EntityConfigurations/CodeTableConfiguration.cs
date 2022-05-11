using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace PSI.Core.Entities.EntityConfigurations
{
    public class CodeTableConfiguration : IEntityTypeConfiguration<CodeTable>
    {
        public void Configure(EntityTypeBuilder<CodeTable> builder)
        {
            builder.Property(x => x.CODE_VALUE).IsRequired();
            builder.Property(x => x.CODE_TEXT).IsRequired();
            // builder.Property(x => x.TaxId).IsRequired();
            // builder.Property(x => x.PsiType).IsRequired().HasMaxLength(1); // 進出貨類別(1:進貨 2:出貨 3:Both)
            // builder.Property(x => x.IsEffective).IsRequired().HasMaxLength(1);
        }
    }
}
