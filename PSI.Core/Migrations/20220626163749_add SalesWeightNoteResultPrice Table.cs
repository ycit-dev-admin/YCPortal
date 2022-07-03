using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace PSI.Core.Migrations
{
    public partial class addSalesWeightNoteResultPriceTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                name: "INSIDE_INVOICEPRICE_HASTAX",
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
                name: "INSIDE_TRAFICFEE_HASTAX",
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
                name: "OUTSIDE_INVOICEPRICE_HASTAX",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "OUTSIDE_PRODUCT_ITEM_UNID",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "OUTSIDE_SALES_WEIGHT",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "OUTSIDE_TRAFICFEE_HASTAX",
                table: "SalesWeightNotes");

            migrationBuilder.DropColumn(
                name: "OUTSIDE_UNIT_PRICE",
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

            migrationBuilder.AddColumn<double>(
                name: "ACTUAL_DEFECTIVE_WEIGHT",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<Guid>(
                name: "ACTUAL_PRODUCT_ITEM_UNID",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "ACTUAL_RECEIVED_TIME",
                table: "SalesWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ACTUAL_RECEIVED_TYPE",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "ACTUAL_SALES_WEIGHT",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<decimal>(
                name: "ACTUAL_UNIT_PRICE",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<double>(
                name: "ESTIMATE_DEFECTIVE_WEIGHT",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<Guid>(
                name: "ESTIMATE_PRODUCT_ITEM_UNID",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "ESTIMATE_RECEIVED_TIME",
                table: "SalesWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ESTIMATE_RECEIVED_TYPE",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "ESTIMATE_SALES_WEIGHT",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<decimal>(
                name: "ESTIMATE_UNIT_PRICE",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<Guid>(
                name: "EXCAVATOR_OPERATOR_UNID",
                table: "SalesWeightNotes",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "SalesWeightNoteResultPrices",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CREATE_TIME = table.Column<DateTime>(nullable: false),
                    CREATE_EMPNO = table.Column<string>(nullable: true),
                    UPDATE_TIME = table.Column<DateTime>(nullable: false),
                    UPDATE_EMPNO = table.Column<string>(nullable: true),
                    DOC_UNID = table.Column<Guid>(nullable: false),
                    DOC_NO = table.Column<string>(nullable: true),
                    DATA_STEP = table.Column<int>(nullable: false),
                    INVOICE_PRICE = table.Column<decimal>(nullable: false),
                    INVOICEPRICE_HASTAX = table.Column<bool>(nullable: false),
                    TRAFIC_FEE = table.Column<decimal>(nullable: false),
                    TRAFICFEE_HASTAX = table.Column<bool>(nullable: false),
                    RECEIVED_PRICE = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalesWeightNoteResultPrices", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SalesWeightNoteResultPrices");

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
                name: "EXCAVATOR_OPERATOR_UNID",
                table: "SalesWeightNotes");

            migrationBuilder.AddColumn<decimal>(
                name: "ACTUAL_TRAFIC_FEE",
                table: "SalesWeightNotes",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "INSIDE_ACTUAL_WEIGHT",
                table: "SalesWeightNotes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "INSIDE_DEFECTIVE_WEIGHT",
                table: "SalesWeightNotes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<bool>(
                name: "INSIDE_INVOICEPRICE_HASTAX",
                table: "SalesWeightNotes",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<decimal>(
                name: "INSIDE_INVOICE_PRICE",
                table: "SalesWeightNotes",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "INSIDE_PRODUCT_ITEM_UNID",
                table: "SalesWeightNotes",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<double>(
                name: "INSIDE_SALES_WEIGHT",
                table: "SalesWeightNotes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<bool>(
                name: "INSIDE_TRAFICFEE_HASTAX",
                table: "SalesWeightNotes",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<decimal>(
                name: "INSIDE_TRAFIC_FEE",
                table: "SalesWeightNotes",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "INSIDE_UNIT_PRICE",
                table: "SalesWeightNotes",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<double>(
                name: "OUTSIDE_ACTUAL_WEIGHT",
                table: "SalesWeightNotes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "OUTSIDE_DEFECTIVE_WEIGHT",
                table: "SalesWeightNotes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<bool>(
                name: "OUTSIDE_INVOICEPRICE_HASTAX",
                table: "SalesWeightNotes",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "OUTSIDE_PRODUCT_ITEM_UNID",
                table: "SalesWeightNotes",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<double>(
                name: "OUTSIDE_SALES_WEIGHT",
                table: "SalesWeightNotes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<bool>(
                name: "OUTSIDE_TRAFICFEE_HASTAX",
                table: "SalesWeightNotes",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<decimal>(
                name: "OUTSIDE_UNIT_PRICE",
                table: "SalesWeightNotes",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "RECEIVED_PRICE",
                table: "SalesWeightNotes",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RECEIVED_TIME",
                table: "SalesWeightNotes",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RECEIVED_TYPE",
                table: "SalesWeightNotes",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
