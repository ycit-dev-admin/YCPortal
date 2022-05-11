using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations
{
    public partial class adjcontracttable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsEffective",
                table: "ProductItems");

            migrationBuilder.DropColumn(
                name: "ProductName",
                table: "ProductItems");

            migrationBuilder.DropColumn(
                name: "PsiType",
                table: "ProductItems");

            migrationBuilder.DropColumn(
                name: "ActualWeight",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "ContractName",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "DealUnitPrice",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "DealWeight",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "IsEffective",
                table: "CustomerContracts");

            migrationBuilder.RenameColumn(
                name: "Remark",
                table: "ProductItems",
                newName: "REMARK");

            migrationBuilder.RenameColumn(
                name: "Remark",
                table: "CustomerContracts",
                newName: "REMARK");

            migrationBuilder.AddColumn<string>(
                name: "IS_EFFECTIVE",
                table: "ProductItems",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PRODUCT_GUID",
                table: "ProductItems",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "PRODUCT_NAME",
                table: "ProductItems",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PSI_TYPE",
                table: "ProductItems",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "ACTUAL_WEIGHT",
                table: "CustomerContracts",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<Guid>(
                name: "CONTRACT_GUID",
                table: "CustomerContracts",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "CONTRACT_NAME",
                table: "CustomerContracts",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CONTRACT_TYPE",
                table: "CustomerContracts",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "CUSTOMER_GUID",
                table: "CustomerContracts",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<double>(
                name: "DEAL_UNIT_PRICE",
                table: "CustomerContracts",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "DEAL_WEIGHT",
                table: "CustomerContracts",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<DateTime>(
                name: "END_DATETIME",
                table: "CustomerContracts",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "EXPIRE_REASON",
                table: "CustomerContracts",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IS_EFFECTIVE",
                table: "CustomerContracts",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PRODUCT_GUID",
                table: "CustomerContracts",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "START_DATETIME",
                table: "CustomerContracts",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IS_EFFECTIVE",
                table: "ProductItems");

            migrationBuilder.DropColumn(
                name: "PRODUCT_GUID",
                table: "ProductItems");

            migrationBuilder.DropColumn(
                name: "PRODUCT_NAME",
                table: "ProductItems");

            migrationBuilder.DropColumn(
                name: "PSI_TYPE",
                table: "ProductItems");

            migrationBuilder.DropColumn(
                name: "ACTUAL_WEIGHT",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "CONTRACT_GUID",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "CONTRACT_NAME",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "CONTRACT_TYPE",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "CUSTOMER_GUID",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "DEAL_UNIT_PRICE",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "DEAL_WEIGHT",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "END_DATETIME",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "EXPIRE_REASON",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "IS_EFFECTIVE",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "PRODUCT_GUID",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "START_DATETIME",
                table: "CustomerContracts");

            migrationBuilder.RenameColumn(
                name: "REMARK",
                table: "ProductItems",
                newName: "Remark");

            migrationBuilder.RenameColumn(
                name: "REMARK",
                table: "CustomerContracts",
                newName: "Remark");

            migrationBuilder.AddColumn<string>(
                name: "IsEffective",
                table: "ProductItems",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProductName",
                table: "ProductItems",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PsiType",
                table: "ProductItems",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "ActualWeight",
                table: "CustomerContracts",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "ContractName",
                table: "CustomerContracts",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "CustomerId",
                table: "CustomerContracts",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<double>(
                name: "DealUnitPrice",
                table: "CustomerContracts",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "DealWeight",
                table: "CustomerContracts",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "IsEffective",
                table: "CustomerContracts",
                type: "text",
                nullable: true);
        }
    }
}
