using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations
{
    public partial class addinventoryupdate2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ITEM_NAME",
                table: "P_Inventory");

            migrationBuilder.AddColumn<string>(
                name: "PRODUCT_ITEM_NAME",
                table: "P_Inventory",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "UNIT_PRICE",
                table: "P_Inventory",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PRODUCT_ITEM_NAME",
                table: "P_Inventory");

            migrationBuilder.DropColumn(
                name: "UNIT_PRICE",
                table: "P_Inventory");

            migrationBuilder.AddColumn<string>(
                name: "ITEM_NAME",
                table: "P_Inventory",
                type: "text",
                nullable: true);
        }
    }
}
