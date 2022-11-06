using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations
{
    public partial class chagetablename : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_SalesWeightNoteResultPrices",
                table: "SalesWeightNoteResultPrices");

            migrationBuilder.RenameTable(
                name: "SalesWeightNoteResultPrices",
                newName: "SalesWeightNoteStepDatas");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SalesWeightNoteStepDatas",
                table: "SalesWeightNoteStepDatas",
                column: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_SalesWeightNoteStepDatas",
                table: "SalesWeightNoteStepDatas");

            migrationBuilder.RenameTable(
                name: "SalesWeightNoteStepDatas",
                newName: "SalesWeightNoteResultPrices");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SalesWeightNoteResultPrices",
                table: "SalesWeightNoteResultPrices",
                column: "ID");
        }
    }
}
