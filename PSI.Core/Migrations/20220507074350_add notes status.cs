using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations
{
    public partial class addnotesstatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NOTE_STATUS",
                table: "PurchaseWeightNotes",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NOTE_STATUS",
                table: "PurchaseWeightNotes");
        }
    }
}
