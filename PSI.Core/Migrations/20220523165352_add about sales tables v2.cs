using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace PSI.Core.Migrations
{
    public partial class addaboutsalestablesv2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SalesIngredients",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CREATE_TIME = table.Column<DateTime>(nullable: false),
                    CREATE_EMPNO = table.Column<string>(nullable: true),
                    UPDATE_TIME = table.Column<DateTime>(nullable: false),
                    UPDATE_EMPNO = table.Column<string>(nullable: true),
                    SALES_WEIGHTNOTE_UNID = table.Column<Guid>(nullable: false),
                    PRODUCT_UNID = table.Column<Guid>(nullable: false),
                    ITEM_NAME = table.Column<string>(nullable: true),
                    ITEM_PERCENT = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalesIngredients", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "SalesWeightNotes",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CREATE_TIME = table.Column<DateTime>(nullable: false),
                    CREATE_EMPNO = table.Column<string>(nullable: true),
                    UPDATE_TIME = table.Column<DateTime>(nullable: false),
                    UPDATE_EMPNO = table.Column<string>(nullable: true),
                    UNID = table.Column<Guid>(nullable: false),
                    DOC_NO = table.Column<string>(nullable: true),
                    CUSTOMER_UNID = table.Column<Guid>(nullable: false),
                    PRODUCT_ITEM_UNID = table.Column<Guid>(nullable: false),
                    LEAVE_WEIGHT = table.Column<double>(nullable: false),
                    DEFECTIVE_WEIGHT = table.Column<double>(nullable: false),
                    ACTUAL_WEIGHT = table.Column<double>(nullable: false),
                    UNIT_PRICE = table.Column<decimal>(nullable: false),
                    INVOICE_PRICE = table.Column<decimal>(nullable: true),
                    TRAFIC_UNIT_PRICE = table.Column<decimal>(nullable: true),
                    TRAFIC_FEE = table.Column<decimal>(nullable: true),
                    RECEIVED_PRICE = table.Column<decimal>(nullable: true),
                    RECEIVED_TYPE = table.Column<string>(nullable: true),
                    RECEIVED_TIME = table.Column<DateTime>(nullable: true),
                    CONTRACT_UNID = table.Column<Guid>(nullable: true),
                    NOTE_STATUS = table.Column<int>(nullable: false),
                    REMARK = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalesWeightNotes", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SalesIngredients");

            migrationBuilder.DropTable(
                name: "SalesWeightNotes");
        }
    }
}
