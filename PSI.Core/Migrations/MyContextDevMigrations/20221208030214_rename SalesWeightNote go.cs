using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations.MyContextDevMigrations
{
    public partial class renameSalesWeightNotego : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_SalesWeightNotes",
                table: "SalesWeightNotes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_P_Inventory",
                table: "P_Inventory");

            migrationBuilder.RenameTable(
                name: "SalesWeightNotes",
                newName: "S_WeightNotes");

            migrationBuilder.RenameTable(
                name: "P_Inventory",
                newName: "P_Inventorys");

            migrationBuilder.AddPrimaryKey(
                name: "PK_S_WeightNotes",
                table: "S_WeightNotes",
                column: "ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_P_Inventorys",
                table: "P_Inventorys",
                column: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_S_WeightNotes",
                table: "S_WeightNotes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_P_Inventorys",
                table: "P_Inventorys");

            migrationBuilder.RenameTable(
                name: "S_WeightNotes",
                newName: "SalesWeightNotes");

            migrationBuilder.RenameTable(
                name: "P_Inventorys",
                newName: "P_Inventory");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SalesWeightNotes",
                table: "SalesWeightNotes",
                column: "ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_P_Inventory",
                table: "P_Inventory",
                column: "ID");
        }
    }
}
