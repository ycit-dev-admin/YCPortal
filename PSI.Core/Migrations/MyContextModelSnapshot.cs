﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using PSI.Core.Infrastructure.DBContext;

namespace PSI.Core.Migrations
{
    [DbContext(typeof(MyContext))]
    partial class MyContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.15")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("PSI.Core.Entities.CodeTable", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("CODE_GROUP")
                        .HasColumnType("text");

                    b.Property<string>("CODE_TEXT")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("CODE_VALUE")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("CREATE_EMPNO")
                        .HasColumnType("text");

                    b.Property<DateTime>("CREATE_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("IS_EFFECTIVE")
                        .HasColumnType("text");

                    b.Property<int?>("SORT")
                        .HasColumnType("integer");

                    b.Property<string>("UPDATE_EMPNO")
                        .HasColumnType("text");

                    b.Property<DateTime>("UPDATE_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("ID");

                    b.ToTable("CodeTables");
                });

            modelBuilder.Entity("PSI.Core.Entities.CustomerCar", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<Guid>("CAR_GUID")
                        .HasColumnType("uuid");

                    b.Property<string>("CAR_NAME")
                        .HasColumnType("text");

                    b.Property<int>("CAR_NO_TYPE")
                        .HasColumnType("integer");

                    b.Property<string>("CREATE_EMPNO")
                        .HasColumnType("text");

                    b.Property<DateTime>("CREATE_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("CUSTOMER_GUID")
                        .HasColumnType("uuid");

                    b.Property<long>("CUSTOMER_ID")
                        .HasColumnType("bigint");

                    b.Property<string>("IS_EFFECTIVE")
                        .HasColumnType("text");

                    b.Property<string>("REMARK")
                        .HasColumnType("text");

                    b.Property<string>("UPDATE_EMPNO")
                        .HasColumnType("text");

                    b.Property<DateTime>("UPDATE_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("ID");

                    b.ToTable("CustomerCars");
                });

            modelBuilder.Entity("PSI.Core.Entities.CustomerContract", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<Guid>("CONTRACT_GUID")
                        .HasColumnType("uuid");

                    b.Property<string>("CONTRACT_NAME")
                        .HasColumnType("text");

                    b.Property<int>("CONTRACT_STATUS")
                        .HasColumnType("integer");

                    b.Property<int>("CONTRACT_TYPE")
                        .HasColumnType("integer");

                    b.Property<string>("CREATE_EMPNO")
                        .HasColumnType("text");

                    b.Property<DateTime>("CREATE_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("CUSTOMER_GUID")
                        .HasColumnType("uuid");

                    b.Property<double>("DEAL_UNIT_PRICE")
                        .HasColumnType("double precision");

                    b.Property<double>("DEAL_WEIGHT")
                        .HasColumnType("double precision");

                    b.Property<DateTime>("END_DATETIME")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("EXPIRE_REASON")
                        .HasColumnType("text");

                    b.Property<Guid>("PRODUCT_GUID")
                        .HasColumnType("uuid");

                    b.Property<string>("REMARK")
                        .HasColumnType("text");

                    b.Property<DateTime>("START_DATETIME")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("UPDATE_EMPNO")
                        .HasColumnType("text");

                    b.Property<DateTime>("UPDATE_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("ID");

                    b.ToTable("CustomerContracts");
                });

            modelBuilder.Entity("PSI.Core.Entities.CustomerContractLog", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<Guid>("CONTRACT_UNID")
                        .HasColumnType("uuid");

                    b.Property<string>("CREATE_EMPNO")
                        .HasColumnType("text");

                    b.Property<DateTime>("CREATE_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("IS_EFFECTIVE")
                        .HasColumnType("text");

                    b.Property<Guid>("PSI_DOC_UNID")
                        .HasColumnType("uuid");

                    b.Property<string>("REMARK")
                        .HasColumnType("text");

                    b.Property<string>("UPDATE_EMPNO")
                        .HasColumnType("text");

                    b.Property<DateTime>("UPDATE_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("ID");

                    b.ToTable("CustomerContractLogs");
                });

            modelBuilder.Entity("PSI.Core.Entities.CustomerInfo", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("ADDRESS")
                        .HasColumnType("text");

                    b.Property<string>("COMPANY_NAME")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("CONTENT_INFO")
                        .HasColumnType("text");

                    b.Property<string>("CREATE_EMPNO")
                        .HasColumnType("text");

                    b.Property<DateTime>("CREATE_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("CUSTOMER_GUID")
                        .HasColumnType("uuid");

                    b.Property<string>("CUSTOMER_NAME")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool?>("IS_CONTRACT")
                        .HasColumnType("boolean");

                    b.Property<string>("IS_EFFECTIVE")
                        .HasColumnType("text");

                    b.Property<int?>("PSI_TYPE")
                        .HasColumnType("integer");

                    b.Property<string>("REMARK")
                        .HasColumnType("text");

                    b.Property<string>("TAX_ID")
                        .HasColumnType("text");

                    b.Property<string>("TITLE")
                        .HasColumnType("text");

                    b.Property<string>("UPDATE_EMPNO")
                        .HasColumnType("text");

                    b.Property<DateTime>("UPDATE_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("ID");

                    b.ToTable("CustomerInfos");
                });

            modelBuilder.Entity("PSI.Core.Entities.ProductItem", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("CREATE_EMPNO")
                        .HasColumnType("text");

                    b.Property<DateTime>("CREATE_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("IS_EFFECTIVE")
                        .HasColumnType("text");

                    b.Property<string>("PRODUCT_NAME")
                        .HasColumnType("text");

                    b.Property<Guid>("PRODUCT_UNID")
                        .HasColumnType("uuid");

                    b.Property<int?>("PSI_TYPE")
                        .HasColumnType("integer");

                    b.Property<string>("REMARK")
                        .HasColumnType("text");

                    b.Property<string>("UPDATE_EMPNO")
                        .HasColumnType("text");

                    b.Property<DateTime>("UPDATE_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("ID");

                    b.ToTable("ProductItems");
                });

            modelBuilder.Entity("PSI.Core.Entities.PurchaseIngredient", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("CREATE_EMPNO")
                        .HasColumnType("text");

                    b.Property<DateTime>("CREATE_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("ITEM_NAME")
                        .HasColumnType("text");

                    b.Property<double>("ITEM_PERCENT")
                        .HasColumnType("double precision");

                    b.Property<Guid>("PRODUCT_UNID")
                        .HasColumnType("uuid");

                    b.Property<Guid>("PURCHASE_WEIGHTNOTE_UNID")
                        .HasColumnType("uuid");

                    b.Property<string>("UPDATE_EMPNO")
                        .HasColumnType("text");

                    b.Property<DateTime>("UPDATE_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("ID");

                    b.ToTable("PurchaseIngredients");
                });

            modelBuilder.Entity("PSI.Core.Entities.PurchaseWeightNote", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<decimal?>("ACTUAL_PRICE")
                        .HasColumnType("numeric");

                    b.Property<string>("CAR_NO")
                        .HasColumnType("text");

                    b.Property<double?>("CAR_WEIGHT")
                        .HasColumnType("double precision");

                    b.Property<DateTime?>("CAR_WEIGHT_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid?>("CONTRACT_UNID")
                        .HasColumnType("uuid");

                    b.Property<string>("CREATE_EMPNO")
                        .HasColumnType("text");

                    b.Property<DateTime>("CREATE_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CUSTOMER_NAME")
                        .HasColumnType("text");

                    b.Property<Guid>("CUSTOMER_UNID")
                        .HasColumnType("uuid");

                    b.Property<string>("DEFECTIVE_REASON")
                        .HasColumnType("text");

                    b.Property<double>("DEFECTIVE_WEIGHT")
                        .HasColumnType("double precision");

                    b.Property<decimal>("DELIVERY_FEE")
                        .HasColumnType("numeric");

                    b.Property<string>("DOC_NO")
                        .HasColumnType("text");

                    b.Property<DateTime>("EFFECTIVE_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("EXCAVATOR_OPERATE_EMPLOYEENO")
                        .HasColumnType("text");

                    b.Property<DateTime?>("EXCAVATOR_OPERATE_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("FAC_NO")
                        .HasColumnType("text");

                    b.Property<double?>("FINALE_DDEFECTIVE_WEIGHT")
                        .HasColumnType("double precision");

                    b.Property<double>("FULL_WEIGHT")
                        .HasColumnType("double precision");

                    b.Property<DateTime>("FULL_WEIGHT_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.Property<bool>("HAS_TAX")
                        .HasColumnType("boolean");

                    b.Property<string>("INPUT_TYPE")
                        .HasColumnType("text");

                    b.Property<int>("NOTE_STATUS")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("PAY_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("PAY_TYPE")
                        .HasColumnType("text");

                    b.Property<Guid>("PRODUCT_ITEM_UNID")
                        .HasColumnType("uuid");

                    b.Property<string>("REMARK")
                        .HasColumnType("text");

                    b.Property<string>("SCALE_NO")
                        .HasColumnType("text");

                    b.Property<decimal>("THIRD_WEIGHT_FEE")
                        .HasColumnType("numeric");

                    b.Property<double?>("TRADE_WEIGHT")
                        .HasColumnType("double precision");

                    b.Property<decimal?>("TRAFIC_UNIT_PRICE")
                        .HasColumnType("numeric");

                    b.Property<Guid>("UNID")
                        .HasColumnType("uuid");

                    b.Property<decimal>("UNIT_PRICE")
                        .HasColumnType("numeric");

                    b.Property<string>("UPDATE_EMPNO")
                        .HasColumnType("text");

                    b.Property<DateTime>("UPDATE_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.Property<decimal?>("WEIGHT_PRICE")
                        .HasColumnType("numeric");

                    b.HasKey("ID");

                    b.ToTable("PurchaseWeightNotes");
                });

            modelBuilder.Entity("PSI.Core.Entities.SalesIngredient", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("CREATE_EMPNO")
                        .HasColumnType("text");

                    b.Property<DateTime>("CREATE_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("ITEM_NAME")
                        .HasColumnType("text");

                    b.Property<double>("ITEM_PERCENT")
                        .HasColumnType("double precision");

                    b.Property<Guid>("PRODUCT_UNID")
                        .HasColumnType("uuid");

                    b.Property<Guid>("SALES_WEIGHTNOTE_UNID")
                        .HasColumnType("uuid");

                    b.Property<string>("UPDATE_EMPNO")
                        .HasColumnType("text");

                    b.Property<DateTime>("UPDATE_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("ID");

                    b.ToTable("SalesIngredients");
                });

            modelBuilder.Entity("PSI.Core.Entities.SalesWeightNote", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<decimal?>("ACTUAL_TRAFIC_FEE")
                        .HasColumnType("numeric");

                    b.Property<Guid?>("CONTRACT_UNID")
                        .HasColumnType("uuid");

                    b.Property<string>("CREATE_EMPNO")
                        .HasColumnType("text");

                    b.Property<DateTime>("CREATE_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("CUSTOMER_UNID")
                        .HasColumnType("uuid");

                    b.Property<string>("DOC_NO")
                        .HasColumnType("text");

                    b.Property<double>("INSIDE_ACTUAL_WEIGHT")
                        .HasColumnType("double precision");

                    b.Property<double>("INSIDE_DEFECTIVE_WEIGHT")
                        .HasColumnType("double precision");

                    b.Property<decimal?>("INSIDE_INVOICE_PRICE")
                        .HasColumnType("numeric");

                    b.Property<Guid>("INSIDE_PRODUCT_ITEM_UNID")
                        .HasColumnType("uuid");

                    b.Property<double>("INSIDE_SALES_WEIGHT")
                        .HasColumnType("double precision");

                    b.Property<decimal?>("INSIDE_TRAFIC_FEE")
                        .HasColumnType("numeric");

                    b.Property<decimal>("INSIDE_UNIT_PRICE")
                        .HasColumnType("numeric");

                    b.Property<int>("NOTE_STATUS")
                        .HasColumnType("integer");

                    b.Property<double>("OUTSIDE_ACTUAL_WEIGHT")
                        .HasColumnType("double precision");

                    b.Property<double>("OUTSIDE_DEFECTIVE_WEIGHT")
                        .HasColumnType("double precision");

                    b.Property<Guid>("OUTSIDE_PRODUCT_ITEM_UNID")
                        .HasColumnType("uuid");

                    b.Property<double>("OUTSIDE_SALES_WEIGHT")
                        .HasColumnType("double precision");

                    b.Property<decimal>("OUTSIDE_UNIT_PRICE")
                        .HasColumnType("numeric");

                    b.Property<decimal?>("RECEIVED_PRICE")
                        .HasColumnType("numeric");

                    b.Property<DateTime?>("RECEIVED_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("RECEIVED_TYPE")
                        .HasColumnType("integer");

                    b.Property<string>("REMARK")
                        .HasColumnType("text");

                    b.Property<decimal?>("TRAFIC_UNIT_PRICE")
                        .HasColumnType("numeric");

                    b.Property<Guid>("UNID")
                        .HasColumnType("uuid");

                    b.Property<string>("UPDATE_EMPNO")
                        .HasColumnType("text");

                    b.Property<DateTime>("UPDATE_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("ID");

                    b.ToTable("SalesWeightNotes");
                });

            modelBuilder.Entity("PSI.Core.Entities.SeqTypeConfig", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("CREATE_EMPNO")
                        .HasColumnType("text");

                    b.Property<DateTime>("CREATE_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.Property<long>("SEQ_NO")
                        .HasColumnType("bigint");

                    b.Property<string>("SEQ_TYPE")
                        .HasColumnType("text");

                    b.Property<string>("UPDATE_EMPNO")
                        .HasColumnType("text");

                    b.Property<DateTime>("UPDATE_TIME")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("ID");

                    b.ToTable("SeqTypeConfigs");
                });
#pragma warning restore 612, 618
        }
    }
}
