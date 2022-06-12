using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations
{
    public partial class adjtables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "PSI_TYPE",
                table: "ProductItems",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PSI_TYPE",
                table: "CustomerInfos",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "PSI_TYPE",
                table: "ProductItems",
                type: "text",
                nullable: true,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PSI_TYPE",
                table: "CustomerInfos",
                type: "text",
                nullable: true,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
