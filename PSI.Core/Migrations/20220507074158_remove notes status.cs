using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations
{
    public partial class removenotesstatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NOTE_STATUS",
                table: "PurchaseWeightNotes");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NOTE_STATUS",
                table: "PurchaseWeightNotes",
                type: "text",
                nullable: true);
        }
    }
}
