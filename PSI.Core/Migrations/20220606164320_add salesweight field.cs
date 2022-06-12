using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations
{
    public partial class addsalesweightfield : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ACTUAL_WEIGHT",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "DEFECTIVE_WEIGHT",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "INVOICE_PRICE",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "LEAVE_WEIGHT",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "PRODUCT_ITEM_UNID",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "TRAFIC_FEE",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "UNIT_PRICE",
                table: "SalesWeightNotes");

            migrationBuilder.AlterColumn<int>(
                name: "RECEIVED_TYPE",
                table: "SalesWeightNotes",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ACTUAL_TRAFIC_FEE",
                table: "SalesWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "INSIDE_ACTUAL_WEIGHT",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "INSIDE_DEFECTIVE_WEIGHT",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<decimal>(
                name: "INSIDE_INVOICE_PRICE",
                table: "SalesWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "INSIDE_PRODUCT_ITEM_UNID",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<double>(
                name: "INSIDE_SALES_WEIGHT",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<decimal>(
                name: "INSIDE_TRAFIC_FEE",
                table: "SalesWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "INSIDE_UNIT_PRICE",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<double>(
                name: "OUTSIDE_ACTUAL_WEIGHT",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "OUTSIDE_DEFECTIVE_WEIGHT",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<Guid>(
                name: "OUTSIDE_PRODUCT_ITEM_UNID",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<double>(
                name: "OUTSIDE_SALES_WEIGHT",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<decimal>(
                name: "OUTSIDE_UNIT_PRICE",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ACTUAL_TRAFIC_FEE",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "INSIDE_ACTUAL_WEIGHT",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "INSIDE_DEFECTIVE_WEIGHT",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "INSIDE_INVOICE_PRICE",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "INSIDE_PRODUCT_ITEM_UNID",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "INSIDE_SALES_WEIGHT",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "INSIDE_TRAFIC_FEE",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "INSIDE_UNIT_PRICE",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "OUTSIDE_ACTUAL_WEIGHT",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "OUTSIDE_DEFECTIVE_WEIGHT",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "OUTSIDE_PRODUCT_ITEM_UNID",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "OUTSIDE_SALES_WEIGHT",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "OUTSIDE_UNIT_PRICE",
                table: "SalesWeightNotes");

            migrationBuilder.AlterColumn<string>(
                name: "RECEIVED_TYPE",
                table: "SalesWeightNotes",
                type: "text",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<double>(
                name: "ACTUAL_WEIGHT",
                table: "SalesWeightNotes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "DEFECTIVE_WEIGHT",
                table: "SalesWeightNotes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<decimal>(
                name: "INVOICE_PRICE",
                table: "SalesWeightNotes",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "LEAVE_WEIGHT",
                table: "SalesWeightNotes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<Guid>(
                name: "PRODUCT_ITEM_UNID",
                table: "SalesWeightNotes",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<decimal>(
                name: "TRAFIC_FEE",
                table: "SalesWeightNotes",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "UNIT_PRICE",
                table: "SalesWeightNotes",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
