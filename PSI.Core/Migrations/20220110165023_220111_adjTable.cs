using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations
{
    public partial class _220111_adjTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SettleType",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "WantPrice",
                table: "PurchaseWeightNotes");

            migrationBuilder.AlterColumn<decimal>(
                name: "ActualPrice",
                table: "PurchaseWeightNotes",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AddColumn<decimal>(
                name: "TraficUnitPrice",
                table: "PurchaseWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "WeightPrice",
                table: "PurchaseWeightNotes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TraficUnitPrice",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "WeightPrice",
                table: "PurchaseWeightNotes");

            migrationBuilder.AlterColumn<decimal>(
                name: "ActualPrice",
                table: "PurchaseWeightNotes",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(decimal),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SettleType",
                table: "PurchaseWeightNotes",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "WantPrice",
                table: "PurchaseWeightNotes",
                type: "numeric",
                nullable: true);
        }
    }
}
