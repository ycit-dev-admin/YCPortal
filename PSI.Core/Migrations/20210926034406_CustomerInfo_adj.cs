using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations
{
    public partial class CustomerInfo_adj : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "CustomerInfos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContentInfo",
                table: "CustomerInfos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "CustomerInfos");

            migrationBuilder.DropColumn(
                name: "ContentInfo",
                table: "CustomerInfos");
        }
    }
}
