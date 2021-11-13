using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace PSI.Core.Migrations
{
    public partial class addIngredientTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Ingredient",
                table: "PurchaseWeightNotes");

            migrationBuilder.AddColumn<DateTime>(
                name: "PayTime",
                table: "PurchaseWeightNotes",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PurchaseIngredients",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreateTime = table.Column<DateTime>(nullable: false),
                    CreateEmpNo = table.Column<string>(nullable: true),
                    UpdateTime = table.Column<DateTime>(nullable: false),
                    UpdateEmpNo = table.Column<string>(nullable: true),
                    PurchaseWeighNoteId = table.Column<long>(nullable: false),
                    ItemName = table.Column<string>(nullable: true),
                    ItemPercent = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseIngredients", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PurchaseIngredients");

            migrationBuilder.DropColumn(
                name: "PayTime",
                table: "PurchaseWeightNotes");

            migrationBuilder.AddColumn<string>(
                name: "Ingredient",
                table: "PurchaseWeightNotes",
                type: "text",
                nullable: true);
        }
    }
}
