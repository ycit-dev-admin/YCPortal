using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations.MyContextDevMigrations
{
    public partial class adjcolumnname : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "_PERCENT",
                table: "PS_WreteOff_Record");

            migrationBuilder.AddColumn<decimal>(
                name: "PERCENT",
                table: "PS_WreteOff_Record",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PERCENT",
                table: "PS_WreteOff_Record");

            migrationBuilder.AddColumn<decimal>(
                name: "_PERCENT",
                table: "PS_WreteOff_Record",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
