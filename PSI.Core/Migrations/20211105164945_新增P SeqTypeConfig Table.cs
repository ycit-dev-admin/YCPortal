using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations
{
    public partial class 新增PSeqTypeConfigTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SeqTypeConfigs",
                columns: table => new
                {
                    SeqType = table.Column<string>(nullable: false),
                    SeqNo = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SeqTypeConfigs", x => x.SeqType);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SeqTypeConfigs");
        }
    }
}
