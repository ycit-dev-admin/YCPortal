﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using PSI.Core.Infrastructure.DBContext;

namespace PSI.Core.Migrations
{
    [DbContext(typeof(MyContext))]
    [Migration("20210926034406_CustomerInfo_adj")]
    partial class CustomerInfo_adj
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.15")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("PSI.Core.Entities.CustomerCar", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("CarName")
                        .HasColumnType("text");

                    b.Property<string>("CreateEmpNo")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<long>("CustomerId")
                        .HasColumnType("bigint");

                    b.Property<string>("IsEffective")
                        .HasColumnType("text");

                    b.Property<string>("Remark")
                        .HasColumnType("text");

                    b.Property<string>("UpdateEmpNo")
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdateTime")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.ToTable("CustomerCars");
                });

            modelBuilder.Entity("PSI.Core.Entities.CustomerContract", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<double>("ActualWeight")
                        .HasColumnType("double precision");

                    b.Property<string>("ContractName")
                        .HasColumnType("text");

                    b.Property<string>("CreateEmpNo")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<long>("CustomerId")
                        .HasColumnType("bigint");

                    b.Property<double>("DealUnitPrice")
                        .HasColumnType("double precision");

                    b.Property<double>("DealWeight")
                        .HasColumnType("double precision");

                    b.Property<string>("IsEffective")
                        .HasColumnType("text");

                    b.Property<string>("Remark")
                        .HasColumnType("text");

                    b.Property<string>("UpdateEmpNo")
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdateTime")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.ToTable("CustomerContracts");
                });

            modelBuilder.Entity("PSI.Core.Entities.CustomerInfo", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Address")
                        .HasColumnType("text");

                    b.Property<string>("CompanyName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ContentInfo")
                        .HasColumnType("text");

                    b.Property<string>("CreateEmpNo")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CustomerName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsContract")
                        .HasColumnType("boolean");

                    b.Property<string>("IsEffective")
                        .IsRequired()
                        .HasColumnType("character varying(1)")
                        .HasMaxLength(1);

                    b.Property<string>("PsiType")
                        .IsRequired()
                        .HasColumnType("character varying(1)")
                        .HasMaxLength(1);

                    b.Property<string>("Remark")
                        .HasColumnType("text");

                    b.Property<string>("TaxId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.Property<string>("UpdateEmpNo")
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdateTime")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.ToTable("CustomerInfos");
                });

            modelBuilder.Entity("PSI.Core.Entities.ProductItem", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("CreateEmpNo")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("IsEffective")
                        .HasColumnType("text");

                    b.Property<string>("ProductName")
                        .HasColumnType("text");

                    b.Property<string>("PsiType")
                        .HasColumnType("text");

                    b.Property<string>("Remark")
                        .HasColumnType("text");

                    b.Property<string>("UpdateEmpNo")
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdateTime")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.ToTable("ProductItems");
                });

            modelBuilder.Entity("PSI.Core.Entities.PurchaseWeightNote", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<decimal>("ActualPrice")
                        .HasColumnType("numeric");

                    b.Property<string>("CarNo")
                        .HasColumnType("text");

                    b.Property<double>("CarWeight")
                        .HasColumnType("double precision");

                    b.Property<DateTime>("CarWeightTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreateEmpNo")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<long>("CustomerId")
                        .HasColumnType("bigint");

                    b.Property<string>("CustomerName")
                        .HasColumnType("text");

                    b.Property<string>("DefectiveReason")
                        .HasColumnType("text");

                    b.Property<double>("DefectiveWeight")
                        .HasColumnType("double precision");

                    b.Property<DateTime>("EffectiveTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("ExcavatorOpEmpNo")
                        .HasColumnType("text");

                    b.Property<DateTime>("ExcavatorOpTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("FacNo")
                        .HasColumnType("text");

                    b.Property<double>("FinalDefectiveWeight")
                        .HasColumnType("double precision");

                    b.Property<double>("FullWeight")
                        .HasColumnType("double precision");

                    b.Property<DateTime>("FullWeightTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<bool>("HasTax")
                        .HasColumnType("boolean");

                    b.Property<string>("Ingredient")
                        .HasColumnType("text");

                    b.Property<string>("InputType")
                        .HasColumnType("text");

                    b.Property<string>("NoteStatus")
                        .HasColumnType("text");

                    b.Property<string>("PayType")
                        .HasColumnType("text");

                    b.Property<string>("Remark")
                        .HasColumnType("text");

                    b.Property<string>("ScaleNo")
                        .HasColumnType("text");

                    b.Property<string>("SettleType")
                        .HasColumnType("text");

                    b.Property<decimal>("ThirdWeightFee")
                        .HasColumnType("numeric");

                    b.Property<double>("TradeWeight")
                        .HasColumnType("double precision");

                    b.Property<decimal>("TraficFee")
                        .HasColumnType("numeric");

                    b.Property<decimal>("UnitPrice")
                        .HasColumnType("numeric");

                    b.Property<string>("UpdateEmpNo")
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<decimal>("WantPrice")
                        .HasColumnType("numeric");

                    b.HasKey("Id");

                    b.ToTable("PurchaseWeightNotes");
                });
#pragma warning restore 612, 618
        }
    }
}
