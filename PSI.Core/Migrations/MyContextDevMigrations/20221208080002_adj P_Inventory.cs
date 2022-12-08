using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations.MyContextDevMigrations
{
    public partial class adjP_Inventory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PURCHASE_DOC_NO",
                table: "P_Inventorys",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PURCHASE_DOC_NO",
                table: "P_Inventorys");
        }
    }
}
