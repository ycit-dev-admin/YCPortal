using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations
{
    public partial class updatetables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CARNO_UNID",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "LEAVE_WEIGHT_TIME",
                table: "SalesWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SCALE_NO",
                table: "SalesWeightNotes",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "SCALE_NO",
                table: "PurchaseWeightNotes",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CARNO_UNID",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "LEAVE_WEIGHT_TIME",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "SCALE_NO",
                table: "SalesWeightNotes");

            migrationBuilder.AlterColumn<string>(
                name: "SCALE_NO",
                table: "PurchaseWeightNotes",
                type: "text",
                nullable: true,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
