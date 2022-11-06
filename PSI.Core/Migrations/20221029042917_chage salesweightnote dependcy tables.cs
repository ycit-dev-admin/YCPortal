using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations
{
    public partial class chagesalesweightnotedependcytables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ACTUAL_DEFECTIVE_WEIGHT",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "ACTUAL_PRODUCT_ITEM_UNID",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "ACTUAL_RECEIVED_TIME",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "ACTUAL_RECEIVED_TYPE",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "ACTUAL_SALES_WEIGHT",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "ACTUAL_UNIT_PRICE",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "ESTIMATE_DEFECTIVE_WEIGHT",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "ESTIMATE_PRODUCT_ITEM_UNID",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "ESTIMATE_RECEIVED_TIME",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "ESTIMATE_RECEIVED_TYPE",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "ESTIMATE_SALES_WEIGHT",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "ESTIMATE_UNIT_PRICE",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "PRODUCT_ITEM_UNID",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "TRAFIC_UNIT_PRICE",
                table: "SalesWeightNotes");

            migrationBuilder.AddColumn<double>(
                name: "DEFECTIVE_WEIGHT",
                table: "SalesWeightNoteResultPrices",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<Guid>(
                name: "PRODUCT_ITEM_UNID",
                table: "SalesWeightNoteResultPrices",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "RECEIVED_TIME",
                table: "SalesWeightNoteResultPrices",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "RECEIVED_TYPE",
                table: "SalesWeightNoteResultPrices",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "SALES_WEIGHT",
                table: "SalesWeightNoteResultPrices",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<decimal>(
                name: "TRAFIC_UNIT_PRICE",
                table: "SalesWeightNoteResultPrices",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "UNIT_PRICE",
                table: "SalesWeightNoteResultPrices",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DEFECTIVE_WEIGHT",
                table: "SalesWeightNoteResultPrices");

            migrationBuilder.DropColumn(
                name: "PRODUCT_ITEM_UNID",
                table: "SalesWeightNoteResultPrices");

            migrationBuilder.DropColumn(
                name: "RECEIVED_TIME",
                table: "SalesWeightNoteResultPrices");

            migrationBuilder.DropColumn(
                name: "RECEIVED_TYPE",
                table: "SalesWeightNoteResultPrices");

            migrationBuilder.DropColumn(
                name: "SALES_WEIGHT",
                table: "SalesWeightNoteResultPrices");

            migrationBuilder.DropColumn(
                name: "TRAFIC_UNIT_PRICE",
                table: "SalesWeightNoteResultPrices");

            migrationBuilder.DropColumn(
                name: "UNIT_PRICE",
                table: "SalesWeightNoteResultPrices");

            migrationBuilder.AddColumn<double>(
                name: "ACTUAL_DEFECTIVE_WEIGHT",
                table: "SalesWeightNotes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<Guid>(
                name: "ACTUAL_PRODUCT_ITEM_UNID",
                table: "SalesWeightNotes",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "ACTUAL_RECEIVED_TIME",
                table: "SalesWeightNotes",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ACTUAL_RECEIVED_TYPE",
                table: "SalesWeightNotes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "ACTUAL_SALES_WEIGHT",
                table: "SalesWeightNotes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<decimal>(
                name: "ACTUAL_UNIT_PRICE",
                table: "SalesWeightNotes",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<double>(
                name: "ESTIMATE_DEFECTIVE_WEIGHT",
                table: "SalesWeightNotes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<Guid>(
                name: "ESTIMATE_PRODUCT_ITEM_UNID",
                table: "SalesWeightNotes",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "ESTIMATE_RECEIVED_TIME",
                table: "SalesWeightNotes",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ESTIMATE_RECEIVED_TYPE",
                table: "SalesWeightNotes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "ESTIMATE_SALES_WEIGHT",
                table: "SalesWeightNotes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<decimal>(
                name: "ESTIMATE_UNIT_PRICE",
                table: "SalesWeightNotes",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<Guid>(
                name: "PRODUCT_ITEM_UNID",
                table: "SalesWeightNotes",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<decimal>(
                name: "TRAFIC_UNIT_PRICE",
                table: "SalesWeightNotes",
                type: "numeric",
                nullable: true);
        }
    }
}
