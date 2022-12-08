using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations.MyContextDevMigrations
{
    public partial class renameSalesWeightNote : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SALES_WEIGHT",
                table: "SalesWeightNotes");

            migrationBuilder.AddColumn<decimal>(
                name: "CUSTOMER_SALES_WEIGHT",
                table: "SalesWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "INSIDE_SALES_WEIGHT",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CUSTOMER_SALES_WEIGHT",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "INSIDE_SALES_WEIGHT",
                table: "SalesWeightNotes");

            migrationBuilder.AddColumn<decimal>(
                name: "SALES_WEIGHT",
                table: "SalesWeightNotes",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
