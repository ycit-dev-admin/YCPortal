using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations
{
    public partial class adjcolumn2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PERCENT",
                table: "PS_WriteOff_Logs");

            migrationBuilder.AlterColumn<Guid>(
                name: "PRODUCT_ITEM_UNID",
                table: "S_WeightNotes",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "PRODUCT_ITEM_UNID",
                table: "S_WeightNotes",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "PERCENT",
                table: "PS_WriteOff_Logs",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
