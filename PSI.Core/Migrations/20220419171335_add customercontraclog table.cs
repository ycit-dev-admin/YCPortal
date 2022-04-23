using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace PSI.Core.Migrations
{
    public partial class addcustomercontraclogtable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CustomerContractLogs",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CREATE_TIME = table.Column<DateTime>(nullable: false),
                    CREATE_EMPNO = table.Column<string>(nullable: true),
                    UPDATE_TIME = table.Column<DateTime>(nullable: false),
                    UPDATE_EMPNO = table.Column<string>(nullable: true),
                    CONTRACT_GUID = table.Column<Guid>(nullable: false),
                    CALCULATE_WEIGHT = table.Column<double>(nullable: false),
                    IS_EFFECTIVE = table.Column<string>(nullable: true),
                    REMARK = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerContractLogs", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomerContractLogs");
        }
    }
}
