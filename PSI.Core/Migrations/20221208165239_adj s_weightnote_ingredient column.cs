using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace PSI.Core.Migrations
{
    public partial class adjs_weightnote_ingredientcolumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PS_WreteOff_Record");

            migrationBuilder.DropTable(
                name: "SalesIngredients");

            migrationBuilder.DropTable(
                name: "SalesWeightNotes");

            migrationBuilder.AddColumn<string>(
                name: "PURCHASE_DOC_NO",
                table: "P_Inventory",
                nullable: true);

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
                    PERCENT = table.Column<decimal>(nullable: false),
                    WRITEOFF_STATUS = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PS_WriteOff_Logs", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "S_WeightNotes",
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
                    CARNO_UNID = table.Column<Guid>(nullable: false),
                    SALES_TIME = table.Column<DateTime>(nullable: false),
                    UPDATE_SALES_TIME = table.Column<DateTime>(nullable: true),
                    SCALE_NO = table.Column<int>(nullable: true),
                    EXCAVATOR_OPERATOR_UNID = table.Column<Guid>(nullable: false),
                    CONTRACT_UNID = table.Column<Guid>(nullable: true),
                    NOTE_STATUS = table.Column<int>(nullable: false),
                    TAX_RENT = table.Column<decimal>(nullable: true),
                    INVOICE_PRICE = table.Column<decimal>(nullable: true),
                    INVOICEPRICE_TAX = table.Column<decimal>(nullable: true),
                    TRAFIC_UNIT_PRICE = table.Column<decimal>(nullable: true),
                    TRAFIC_FEE = table.Column<decimal>(nullable: true),
                    TRAFIC_FEE_TAX = table.Column<decimal>(nullable: true),
                    RECEIVED_PRICE = table.Column<decimal>(nullable: true),
                    PRODUCT_ITEM_UNID = table.Column<Guid>(nullable: false),
                    INSIDE_SALES_WEIGHT = table.Column<decimal>(nullable: false),
                    CUSTOMER_SALES_WEIGHT = table.Column<decimal>(nullable: true),
                    DEFECTIVE_WEIGHT = table.Column<decimal>(nullable: true),
                    SALES_UNIT_PRICE = table.Column<decimal>(nullable: false),
                    RECEIVED_UNIT_PRICE = table.Column<decimal>(nullable: true),
                    RECEIVED_TYPE = table.Column<int>(nullable: true),
                    RECEIVED_TIME = table.Column<DateTime>(nullable: true),
                    REMARK = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_S_WeightNotes", x => x.ID);
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
                name: "S_WeightNotes");

            migrationBuilder.DropTable(
                name: "S_WeightNotes_Ingredients");

            migrationBuilder.DropColumn(
                name: "PURCHASE_DOC_NO",
                table: "P_Inventory");

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

            migrationBuilder.CreateTable(
                name: "SalesWeightNotes",
                columns: table => new
                {
                    ID = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CARNO_UNID = table.Column<Guid>(type: "uuid", nullable: false),
                    CONTRACT_UNID = table.Column<Guid>(type: "uuid", nullable: true),
                    CREATE_EMPNO = table.Column<string>(type: "text", nullable: true),
                    CREATE_TIME = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CUSTOMER_UNID = table.Column<Guid>(type: "uuid", nullable: false),
                    DEFECTIVE_WEIGHT = table.Column<decimal>(type: "numeric", nullable: true),
                    DOC_NO = table.Column<string>(type: "text", nullable: true),
                    EXCAVATOR_OPERATOR_UNID = table.Column<Guid>(type: "uuid", nullable: false),
                    INVOICEPRICE_TAX = table.Column<decimal>(type: "numeric", nullable: true),
                    INVOICE_PRICE = table.Column<decimal>(type: "numeric", nullable: true),
                    NOTE_STATUS = table.Column<int>(type: "integer", nullable: false),
                    PRODUCT_ITEM_UNID = table.Column<Guid>(type: "uuid", nullable: false),
                    RECEIVED_PRICE = table.Column<decimal>(type: "numeric", nullable: true),
                    RECEIVED_TIME = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    RECEIVED_TYPE = table.Column<int>(type: "integer", nullable: true),
                    RECEIVED_UNIT_PRICE = table.Column<decimal>(type: "numeric", nullable: true),
                    REMARK = table.Column<string>(type: "text", nullable: true),
                    SALES_TIME = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    SALES_UNIT_PRICE = table.Column<decimal>(type: "numeric", nullable: false),
                    SALES_WEIGHT = table.Column<decimal>(type: "numeric", nullable: false),
                    SCALE_NO = table.Column<int>(type: "integer", nullable: true),
                    TAX_RENT = table.Column<decimal>(type: "numeric", nullable: true),
                    TRAFIC_FEE = table.Column<decimal>(type: "numeric", nullable: true),
                    TRAFIC_FEE_TAX = table.Column<decimal>(type: "numeric", nullable: true),
                    TRAFIC_UNIT_PRICE = table.Column<decimal>(type: "numeric", nullable: true),
                    UNID = table.Column<Guid>(type: "uuid", nullable: false),
                    UPDATE_EMPNO = table.Column<string>(type: "text", nullable: true),
                    UPDATE_SALES_TIME = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    UPDATE_TIME = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalesWeightNotes", x => x.ID);
                });
        }
    }
}
