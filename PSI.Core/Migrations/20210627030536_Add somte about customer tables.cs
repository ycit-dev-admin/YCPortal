using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace PSI.Core.Migrations
{
    public partial class Addsomteaboutcustomertables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_CustomerInfo",
                table: "CustomerInfo");

            migrationBuilder.RenameTable(
                name: "CustomerInfo",
                newName: "CustomerInfos");

            migrationBuilder.AlterColumn<double>(
                name: "TradeWeight",
                table: "PurchaseWeightNotes",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AlterColumn<double>(
                name: "FullWeight",
                table: "PurchaseWeightNotes",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AlterColumn<double>(
                name: "FinalDefectiveWeight",
                table: "PurchaseWeightNotes",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AlterColumn<double>(
                name: "DefectiveWeight",
                table: "PurchaseWeightNotes",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AlterColumn<double>(
                name: "CarWeight",
                table: "PurchaseWeightNotes",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AddColumn<string>(
                name: "CreateEmpNo",
                table: "PurchaseWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdateEmpNo",
                table: "PurchaseWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdateTime",
                table: "PurchaseWeightNotes",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreateEmpNo",
                table: "CustomerInfos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdateEmpNo",
                table: "CustomerInfos",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdateTime",
                table: "CustomerInfos",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_CustomerInfos",
                table: "CustomerInfos",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "CustomerCars",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreateTime = table.Column<DateTime>(nullable: false),
                    CreateEmpNo = table.Column<string>(nullable: true),
                    UpdateTime = table.Column<DateTime>(nullable: false),
                    UpdateEmpNo = table.Column<string>(nullable: true),
                    CustomerId = table.Column<long>(nullable: false),
                    CarName = table.Column<string>(nullable: true),
                    IsEffective = table.Column<string>(nullable: true),
                    Remark = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerCars", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CustomerContracts",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreateTime = table.Column<DateTime>(nullable: false),
                    CreateEmpNo = table.Column<string>(nullable: true),
                    UpdateTime = table.Column<DateTime>(nullable: false),
                    UpdateEmpNo = table.Column<string>(nullable: true),
                    CustomerId = table.Column<long>(nullable: false),
                    ContractName = table.Column<string>(nullable: true),
                    DealWeight = table.Column<double>(nullable: false),
                    ActualWeight = table.Column<double>(nullable: false),
                    DealUnitPrice = table.Column<double>(nullable: false),
                    IsEffective = table.Column<string>(nullable: true),
                    Remark = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerContracts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProductItems",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreateTime = table.Column<DateTime>(nullable: false),
                    CreateEmpNo = table.Column<string>(nullable: true),
                    UpdateTime = table.Column<DateTime>(nullable: false),
                    UpdateEmpNo = table.Column<string>(nullable: true),
                    ProductName = table.Column<string>(nullable: true),
                    PsiType = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    IsEffective = table.Column<string>(nullable: true),
                    Remark = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductItems", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomerCars");

            migrationBuilder.DropTable(
                name: "CustomerContracts");

            migrationBuilder.DropTable(
                name: "ProductItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CustomerInfos",
                table: "CustomerInfos");

            migrationBuilder.DropColumn(
                name: "CreateEmpNo",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "UpdateEmpNo",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "UpdateTime",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "CreateEmpNo",
                table: "CustomerInfos");

            migrationBuilder.DropColumn(
                name: "UpdateEmpNo",
                table: "CustomerInfos");

            migrationBuilder.DropColumn(
                name: "UpdateTime",
                table: "CustomerInfos");

            migrationBuilder.RenameTable(
                name: "CustomerInfos",
                newName: "CustomerInfo");

            migrationBuilder.AlterColumn<float>(
                name: "TradeWeight",
                table: "PurchaseWeightNotes",
                type: "real",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<float>(
                name: "FullWeight",
                table: "PurchaseWeightNotes",
                type: "real",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<float>(
                name: "FinalDefectiveWeight",
                table: "PurchaseWeightNotes",
                type: "real",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<float>(
                name: "DefectiveWeight",
                table: "PurchaseWeightNotes",
                type: "real",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<float>(
                name: "CarWeight",
                table: "PurchaseWeightNotes",
                type: "real",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AddPrimaryKey(
                name: "PK_CustomerInfo",
                table: "CustomerInfo",
                column: "Id");
        }
    }
}
