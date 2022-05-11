using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations
{
    public partial class adjustproductunidfield : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PRODUCT_GUID",
                table: "ProductItems");

            migrationBuilder.AddColumn<Guid>(
                name: "PRODUCT_UNID",
                table: "ProductItems",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PRODUCT_UNID",
                table: "ProductItems");

            migrationBuilder.AddColumn<Guid>(
                name: "PRODUCT_GUID",
                table: "ProductItems",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }
    }
}
