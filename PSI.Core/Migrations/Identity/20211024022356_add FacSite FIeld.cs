using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations.Identity
{
    public partial class addFacSiteFIeld : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FacSite",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FacSite",
                table: "AspNetUsers");
        }
    }
}
