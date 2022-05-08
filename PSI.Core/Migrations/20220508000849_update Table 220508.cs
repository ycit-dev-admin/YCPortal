using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations
{
    public partial class updateTable220508 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IS_EFECTIVE",
                table: "CustomerInfos");

            migrationBuilder.AddColumn<Guid>(
                name: "CONTRACT_UNID",
                table: "PurchaseWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IS_EFFECTIVE",
                table: "CustomerInfos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CONTRACT_UNID",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "IS_EFFECTIVE",
                table: "CustomerInfos");

            migrationBuilder.AddColumn<string>(
                name: "IS_EFECTIVE",
                table: "CustomerInfos",
                type: "text",
                nullable: true);
        }
    }
}
