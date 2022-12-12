using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace PSI.Core.Migrations.MyContextDevMigrations
{
    public partial class adjcolumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PS_WreteOff_Record");

            migrationBuilder.DropTable(
                name: "SalesIngredients");

            migrationBuilder.AlterColumn<Guid>(
                name: "PRODUCT_ITEM_UNID",
                table: "S_WeightNotes",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.CreateTable(
                name: "PS_WriteOff_Logs",
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
                    PRODUCT_UNID = table.Column<Guid>(nullable: false),
                    PRODUCT_NAME = table.Column<string>(nullable: true),
                    WRITEOFF_WEIGHT = table.Column<decimal>(nullable: false),
                    WRITEOFF_STATUS = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PS_WriteOff_Logs", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "S_WeightNotes_Ingredients",
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
                    ITEM_PERCENT = table.Column<decimal>(nullable: false),
                    LIVEIN_UNIT_PRICE = table.Column<decimal>(nullable: false),
                    REAL_UNIT_PRICE = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_S_WeightNotes_Ingredients", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PS_WriteOff_Logs");

            migrationBuilder.DropTable(
                name: "S_WeightNotes_Ingredients");

            migrationBuilder.AlterColumn<Guid>(
                name: "PRODUCT_ITEM_UNID",
                table: "S_WeightNotes",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "PS_WreteOff_Record",
                columns: table => new
                {
                    ID = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CREATE_EMPNO = table.Column<string>(type: "text", nullable: true),
                    CREATE_TIME = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    LIVEIN_UNIT_PRICE = table.Column<decimal>(type: "numeric", nullable: false),
                    PERCENT = table.Column<decimal>(type: "numeric", nullable: false),
                    PRODUCT_NAME = table.Column<string>(type: "text", nullable: true),
                    PRODUCT_PERCENT = table.Column<decimal>(type: "numeric", nullable: false),
                    PRODUCT_UNID = table.Column<Guid>(type: "uuid", nullable: false),
                    PURCHASE_DOC_NO = table.Column<string>(type: "text", nullable: true),
                    PURCHASE_WEIGHTNOTE_UNID = table.Column<Guid>(type: "uuid", nullable: false),
                    REAL_UNIT_PRICE = table.Column<decimal>(type: "numeric", nullable: false),
                    SALES_DOC_NO = table.Column<string>(type: "text", nullable: true),
                    SALES_WEIGHTNOTE_UNID = table.Column<Guid>(type: "uuid", nullable: false),
                    UPDATE_EMPNO = table.Column<string>(type: "text", nullable: true),
                    UPDATE_TIME = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    WRITEOFF_WEIGHT = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PS_WreteOff_Record", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "SalesIngredients",
                columns: table => new
                {
                    ID = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CREATE_EMPNO = table.Column<string>(type: "text", nullable: true),
                    CREATE_TIME = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    ITEM_NAME = table.Column<string>(type: "text", nullable: true),
                    ITEM_PERCENT = table.Column<double>(type: "double precision", nullable: false),
                    PRODUCT_UNID = table.Column<Guid>(type: "uuid", nullable: false),
                    SALES_WEIGHTNOTE_UNID = table.Column<Guid>(type: "uuid", nullable: false),
                    UPDATE_EMPNO = table.Column<string>(type: "text", nullable: true),
                    UPDATE_TIME = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalesIngredients", x => x.ID);
                });
        }
    }
}
