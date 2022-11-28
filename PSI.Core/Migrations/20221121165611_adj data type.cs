using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations
{
    public partial class adjdatatype : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "REMAINING_WEIGHT",
                table: "P_Inventory",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision");

            migrationBuilder.AlterColumn<decimal>(
                name: "PURCHASE_WEIGHTNOTE",
                table: "P_Inventory",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision");

            migrationBuilder.AlterColumn<int>(
                name: "ITEM_PERCENT",
                table: "P_Inventory",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "REMAINING_WEIGHT",
                table: "P_Inventory",
                type: "double precision",
                nullable: false,
                oldClrType: typeof(decimal));

            migrationBuilder.AlterColumn<double>(
                name: "PURCHASE_WEIGHTNOTE",
                table: "P_Inventory",
                type: "double precision",
                nullable: false,
                oldClrType: typeof(decimal));

            migrationBuilder.AlterColumn<double>(
                name: "ITEM_PERCENT",
                table: "P_Inventory",
                type: "double precision",
                nullable: false,
                oldClrType: typeof(int));
        }
    }
}
