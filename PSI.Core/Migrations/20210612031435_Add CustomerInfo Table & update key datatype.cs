using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace PSI.Core.Migrations
{
    public partial class AddCustomerInfoTableupdatekeydatatype : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "CustomerId",
                table: "PurchaseWeightNotes",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<long>(
                name: "Id",
                table: "PurchaseWeightNotes",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateTime",
                table: "PurchaseWeightNotes",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "CustomerInfo",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreateTime = table.Column<DateTime>(nullable: false),
                    CompanyName = table.Column<string>(nullable: false),
                    TaxId = table.Column<string>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    CustomerName = table.Column<string>(nullable: false),
                    PsiType = table.Column<string>(maxLength: 1, nullable: false),
                    IsShow = table.Column<string>(maxLength: 1, nullable: false),
                    IsContract = table.Column<bool>(nullable: false),
                    Remark = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerInfo", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomerInfo");

            migrationBuilder.DropColumn(
                name: "CreateTime",
                table: "PurchaseWeightNotes");

            migrationBuilder.AlterColumn<int>(
                name: "CustomerId",
                table: "PurchaseWeightNotes",
                type: "integer",
                nullable: false,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "PurchaseWeightNotes",
                type: "integer",
                nullable: false,
                oldClrType: typeof(long))
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);
        }
    }
}
