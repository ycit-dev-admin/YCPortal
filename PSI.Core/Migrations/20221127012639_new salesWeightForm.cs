using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations
{
    public partial class newsalesWeightForm : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LEAVE_WEIGHT_TIME",
                table: "SalesWeightNotes");

            migrationBuilder.AddColumn<decimal>(
                name: "DEFECTIVE_WEIGHT",
                table: "SalesWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "INVOICEPRICE_TAX",
                table: "SalesWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "INVOICE_PRICE",
                table: "SalesWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PRODUCT_ITEM_UNID",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<decimal>(
                name: "RECEIVED_PRICE",
                table: "SalesWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RECEIVED_TIME",
                table: "SalesWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RECEIVED_TYPE",
                table: "SalesWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "RECEIVED_UNIT_PRICE",
                table: "SalesWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "SALES_TIME",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<decimal>(
                name: "SALES_UNIT_PRICE",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "SALES_WEIGHT",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "TAX_RENT",
                table: "SalesWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "TRAFIC_FEE",
                table: "SalesWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "TRAFIC_FEE_TAX",
                table: "SalesWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "TRAFIC_UNIT_PRICE",
                table: "SalesWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UPDATE_SALES_TIME",
                table: "SalesWeightNotes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DEFECTIVE_WEIGHT",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "INVOICEPRICE_TAX",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "INVOICE_PRICE",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "PRODUCT_ITEM_UNID",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "RECEIVED_PRICE",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "RECEIVED_TIME",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "RECEIVED_TYPE",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "RECEIVED_UNIT_PRICE",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "SALES_TIME",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "SALES_UNIT_PRICE",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "SALES_WEIGHT",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "TAX_RENT",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "TRAFIC_FEE",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "TRAFIC_FEE_TAX",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "TRAFIC_UNIT_PRICE",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "UPDATE_SALES_TIME",
                table: "SalesWeightNotes");

            migrationBuilder.AddColumn<DateTime>(
                name: "LEAVE_WEIGHT_TIME",
                table: "SalesWeightNotes",
                type: "timestamp without time zone",
                nullable: true);
        }
    }
}
