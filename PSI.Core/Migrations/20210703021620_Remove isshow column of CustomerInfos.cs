using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations
{
    public partial class RemoveisshowcolumnofCustomerInfos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsShow",
                table: "CustomerInfos");

            migrationBuilder.AddColumn<string>(
                name: "IsEffective",
                table: "CustomerInfos",
                maxLength: 1,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsEffective",
                table: "CustomerInfos");

            migrationBuilder.AddColumn<string>(
                name: "IsShow",
                table: "CustomerInfos",
                type: "character varying(1)",
                maxLength: 1,
                nullable: false,
                defaultValue: "");
        }
    }
}
