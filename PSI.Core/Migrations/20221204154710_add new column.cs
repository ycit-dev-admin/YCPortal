using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations
{
    public partial class addnewcolumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "WRITEOFF_WEIGHT",
                table: "PS_WreteOff_Record",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision");

            migrationBuilder.AddColumn<double>(
                name: "ITEM_PERCENT",
                table: "PS_WreteOff_Record",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ITEM_PERCENT",
                table: "PS_WreteOff_Record");

            migrationBuilder.AlterColumn<double>(
                name: "WRITEOFF_WEIGHT",
                table: "PS_WreteOff_Record",
                type: "double precision",
                nullable: false,
                oldClrType: typeof(decimal));
        }
    }
}
