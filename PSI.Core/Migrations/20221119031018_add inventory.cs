using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations
{
    public partial class addinventory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "PURCHASE_WEIGHTNOTE",
                table: "PurchaseIngredients",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "REMAINING_WEIGHT",
                table: "PurchaseIngredients",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "STATUS",
                table: "PurchaseIngredients",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PURCHASE_WEIGHTNOTE",
                table: "PurchaseIngredients");

            migrationBuilder.DropColumn(
                name: "REMAINING_WEIGHT",
                table: "PurchaseIngredients");

            migrationBuilder.DropColumn(
                name: "STATUS",
                table: "PurchaseIngredients");
        }
    }
}
