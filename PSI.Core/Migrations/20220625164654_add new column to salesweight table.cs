using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations
{
    public partial class addnewcolumntosalesweighttable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "INSIDE_INVOICEPRICE_HASTAX",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "INSIDE_TRAFICFEE_HASTAX",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "OUTSIDE_INVOICEPRICE_HASTAX",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "OUTSIDE_TRAFICFEE_HASTAX",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "INSIDE_INVOICEPRICE_HASTAX",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "INSIDE_TRAFICFEE_HASTAX",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "OUTSIDE_INVOICEPRICE_HASTAX",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "OUTSIDE_TRAFICFEE_HASTAX",
                table: "SalesWeightNotes");
        }
    }
}
