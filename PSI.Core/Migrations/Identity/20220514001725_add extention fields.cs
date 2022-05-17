using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations.Identity
{
    public partial class addextentionfields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FacSite",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "NickName",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "AUTHORITY_LEVEL",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "EMPLOYEE_NO",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FAC_SITE",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NICK_NAME",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AUTHORITY_LEVEL",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "EMPLOYEE_NO",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "FAC_SITE",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "NICK_NAME",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "FacSite",
                table: "AspNetUsers",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NickName",
                table: "AspNetUsers",
                type: "text",
                nullable: true);
        }
    }
}
