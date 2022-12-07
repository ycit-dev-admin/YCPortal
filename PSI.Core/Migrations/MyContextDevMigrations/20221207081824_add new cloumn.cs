using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations.MyContextDevMigrations
{
    public partial class addnewcloumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ITEM_PERCENT",
                table: "PS_WreteOff_Record");

            migrationBuilder.DropColumn(
                name: "WRITEOFF_ITEM_NAME",
                table: "PS_WreteOff_Record");

            migrationBuilder.DropColumn(
                name: "WRITEOFF_PRODUCT_UNID",
                table: "PS_WreteOff_Record");

            migrationBuilder.DropColumn(
                name: "PURCHASE_WEIGHTNOTE",
                table: "P_Inventory");

            migrationBuilder.AddColumn<decimal>(
                name: "LIVEIN_UNIT_PRICE",
                table: "PS_WreteOff_Record",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "PRODUCT_NAME",
                table: "PS_WreteOff_Record",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "PRODUCT_PERCENT",
                table: "PS_WreteOff_Record",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<Guid>(
                name: "PRODUCT_UNID",
                table: "PS_WreteOff_Record",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<decimal>(
                name: "REAL_UNIT_PRICE",
                table: "PS_WreteOff_Record",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "_PERCENT",
                table: "PS_WreteOff_Record",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "PURCHASE_WEIGHT",
                table: "P_Inventory",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LIVEIN_UNIT_PRICE",
                table: "PS_WreteOff_Record");

            migrationBuilder.DropColumn(
                name: "PRODUCT_NAME",
                table: "PS_WreteOff_Record");

            migrationBuilder.DropColumn(
                name: "PRODUCT_PERCENT",
                table: "PS_WreteOff_Record");

            migrationBuilder.DropColumn(
                name: "PRODUCT_UNID",
                table: "PS_WreteOff_Record");

            migrationBuilder.DropColumn(
                name: "REAL_UNIT_PRICE",
                table: "PS_WreteOff_Record");

            migrationBuilder.DropColumn(
                name: "_PERCENT",
                table: "PS_WreteOff_Record");

            migrationBuilder.DropColumn(
                name: "PURCHASE_WEIGHT",
                table: "P_Inventory");

            migrationBuilder.AddColumn<double>(
                name: "ITEM_PERCENT",
                table: "PS_WreteOff_Record",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "WRITEOFF_ITEM_NAME",
                table: "PS_WreteOff_Record",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "WRITEOFF_PRODUCT_UNID",
                table: "PS_WreteOff_Record",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<decimal>(
                name: "PURCHASE_WEIGHTNOTE",
                table: "P_Inventory",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
