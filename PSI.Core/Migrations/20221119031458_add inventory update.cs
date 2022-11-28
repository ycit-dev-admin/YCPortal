using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace PSI.Core.Migrations
{
    public partial class addinventoryupdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "P_Inventory",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CREATE_TIME = table.Column<DateTime>(nullable: false),
                    CREATE_EMPNO = table.Column<string>(nullable: true),
                    UPDATE_TIME = table.Column<DateTime>(nullable: false),
                    UPDATE_EMPNO = table.Column<string>(nullable: true),
                    PURCHASE_WEIGHTNOTE_UNID = table.Column<Guid>(nullable: false),
                    PRODUCT_UNID = table.Column<Guid>(nullable: false),
                    ITEM_NAME = table.Column<string>(nullable: true),
                    PURCHASE_WEIGHTNOTE = table.Column<double>(nullable: false),
                    REMAINING_WEIGHT = table.Column<double>(nullable: false),
                    ITEM_PERCENT = table.Column<double>(nullable: false),
                    STATUS = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_P_Inventory", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "PS_WreteOff_Record",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CREATE_TIME = table.Column<DateTime>(nullable: false),
                    CREATE_EMPNO = table.Column<string>(nullable: true),
                    UPDATE_TIME = table.Column<DateTime>(nullable: false),
                    UPDATE_EMPNO = table.Column<string>(nullable: true),
                    PURCHASE_WEIGHTNOTE_UNID = table.Column<Guid>(nullable: false),
                    PURCHASE_DOC_NO = table.Column<string>(nullable: true),
                    SALES_WEIGHTNOTE_UNID = table.Column<Guid>(nullable: false),
                    SALES_DOC_NO = table.Column<string>(nullable: true),
                    WRITEOFF_PRODUCT_UNID = table.Column<Guid>(nullable: false),
                    WRITEOFF_ITEM_NAME = table.Column<string>(nullable: true),
                    WRITEOFF_WEIGHT = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PS_WreteOff_Record", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "P_Inventory");

            migrationBuilder.DropTable(
                name: "PS_WreteOff_Record");
        }
    }
}
