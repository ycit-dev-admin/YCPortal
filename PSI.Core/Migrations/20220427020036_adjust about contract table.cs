using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations
{
    public partial class adjustaboutcontracttable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ACTUAL_WEIGHT",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "IS_EFFECTIVE",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "CALCULATE_WEIGHT",
                table: "CustomerContractLogs");

            migrationBuilder.AddColumn<int>(
                name: "CONTRACT_STATUS",
                table: "CustomerContracts",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "PSI_DOC_GUID",
                table: "CustomerContractLogs",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CONTRACT_STATUS",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "PSI_DOC_GUID",
                table: "CustomerContractLogs");

            migrationBuilder.AddColumn<double>(
                name: "ACTUAL_WEIGHT",
                table: "CustomerContracts",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "IS_EFFECTIVE",
                table: "CustomerContracts",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "CALCULATE_WEIGHT",
                table: "CustomerContractLogs",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
