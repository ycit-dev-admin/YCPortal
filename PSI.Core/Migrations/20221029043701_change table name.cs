using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations
{
    public partial class changetablename : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_SalesWeightNoteStepDatas",
                table: "SalesWeightNoteStepDatas");

            migrationBuilder.RenameTable(
                name: "SalesWeightNoteStepDatas",
                newName: "SalesWeightNotesStepDatas");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SalesWeightNotesStepDatas",
                table: "SalesWeightNotesStepDatas",
                column: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_SalesWeightNotesStepDatas",
                table: "SalesWeightNotesStepDatas");

            migrationBuilder.RenameTable(
                name: "SalesWeightNotesStepDatas",
                newName: "SalesWeightNoteStepDatas");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SalesWeightNoteStepDatas",
                table: "SalesWeightNoteStepDatas",
                column: "ID");
        }
    }
}
