using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace PSI.Core.Migrations.MyContextDevMigrations
{
    public partial class testgogo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CodeTables",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CREATE_TIME = table.Column<DateTime>(nullable: false),
                    CREATE_EMPNO = table.Column<string>(nullable: true),
                    UPDATE_TIME = table.Column<DateTime>(nullable: false),
                    UPDATE_EMPNO = table.Column<string>(nullable: true),
                    CODE_GROUP = table.Column<string>(nullable: true),
                    CODE_VALUE = table.Column<string>(nullable: false),
                    CODE_TEXT = table.Column<string>(nullable: false),
                    SORT = table.Column<int>(nullable: true),
                    IS_EFFECTIVE = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CodeTables", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "CustomerCars",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CREATE_TIME = table.Column<DateTime>(nullable: false),
                    CREATE_EMPNO = table.Column<string>(nullable: true),
                    UPDATE_TIME = table.Column<DateTime>(nullable: false),
                    UPDATE_EMPNO = table.Column<string>(nullable: true),
                    CAR_GUID = table.Column<Guid>(nullable: false),
                    CUSTOMER_GUID = table.Column<Guid>(nullable: false),
                    CAR_NO_TYPE = table.Column<int>(nullable: false),
                    CUSTOMER_ID = table.Column<long>(nullable: false),
                    CAR_NAME = table.Column<string>(nullable: true),
                    IS_EFFECTIVE = table.Column<string>(nullable: true),
                    REMARK = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerCars", x => x.ID);
                });

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
                    CONTRACT_UNID = table.Column<Guid>(nullable: false),
                    PSI_DOC_UNID = table.Column<Guid>(nullable: false),
                    IS_EFFECTIVE = table.Column<string>(nullable: true),
                    REMARK = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerContractLogs", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "CustomerContracts",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CREATE_TIME = table.Column<DateTime>(nullable: false),
                    CREATE_EMPNO = table.Column<string>(nullable: true),
                    UPDATE_TIME = table.Column<DateTime>(nullable: false),
                    UPDATE_EMPNO = table.Column<string>(nullable: true),
                    CONTRACT_GUID = table.Column<Guid>(nullable: false),
                    CONTRACT_NAME = table.Column<string>(nullable: true),
                    CUSTOMER_GUID = table.Column<Guid>(nullable: false),
                    PRODUCT_GUID = table.Column<Guid>(nullable: false),
                    CONTRACT_TYPE = table.Column<int>(nullable: false),
                    START_DATETIME = table.Column<DateTime>(nullable: false),
                    END_DATETIME = table.Column<DateTime>(nullable: false),
                    EXPIRE_REASON = table.Column<string>(nullable: true),
                    DEAL_WEIGHT = table.Column<double>(nullable: false),
                    DEAL_UNIT_PRICE = table.Column<double>(nullable: false),
                    CONTRACT_STATUS = table.Column<int>(nullable: false),
                    REMARK = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerContracts", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "CustomerInfos",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CREATE_TIME = table.Column<DateTime>(nullable: false),
                    CREATE_EMPNO = table.Column<string>(nullable: true),
                    UPDATE_TIME = table.Column<DateTime>(nullable: false),
                    UPDATE_EMPNO = table.Column<string>(nullable: true),
                    CUSTOMER_GUID = table.Column<Guid>(nullable: false),
                    COMPANY_NAME = table.Column<string>(nullable: false),
                    TAX_ID = table.Column<string>(nullable: true),
                    TITLE = table.Column<string>(nullable: true),
                    CUSTOMER_NAME = table.Column<string>(nullable: false),
                    ADDRESS = table.Column<string>(nullable: true),
                    CONTENT_INFO = table.Column<string>(nullable: true),
                    PSI_TYPE = table.Column<int>(nullable: true),
                    IS_EFFECTIVE = table.Column<string>(nullable: true),
                    IS_CONTRACT = table.Column<bool>(nullable: true),
                    REMARK = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerInfos", x => x.ID);
                });

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
                    PRODUCT_ITEM_NAME = table.Column<string>(nullable: true),
                    PURCHASE_WEIGHTNOTE = table.Column<decimal>(nullable: false),
                    REMAINING_WEIGHT = table.Column<decimal>(nullable: false),
                    ITEM_PERCENT = table.Column<int>(nullable: false),
                    UNIT_PRICE = table.Column<decimal>(nullable: false),
                    STATUS = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_P_Inventory", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ProductItems",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CREATE_TIME = table.Column<DateTime>(nullable: false),
                    CREATE_EMPNO = table.Column<string>(nullable: true),
                    UPDATE_TIME = table.Column<DateTime>(nullable: false),
                    UPDATE_EMPNO = table.Column<string>(nullable: true),
                    PRODUCT_UNID = table.Column<Guid>(nullable: false),
                    PRODUCT_NAME = table.Column<string>(nullable: true),
                    PSI_TYPE = table.Column<int>(nullable: true),
                    IS_EFFECTIVE = table.Column<string>(nullable: true),
                    REMARK = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductItems", x => x.ID);
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
                    WRITEOFF_WEIGHT = table.Column<decimal>(nullable: false),
                    ITEM_PERCENT = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PS_WreteOff_Record", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "PurchaseIngredients",
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
                    table.PrimaryKey("PK_PurchaseIngredients", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "PurchaseWeightNotes",
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
                    CAR_NO = table.Column<string>(nullable: true),
                    FULL_WEIGHT = table.Column<double>(nullable: false),
                    FULL_WEIGHT_TIME = table.Column<DateTime>(nullable: false),
                    SCALE_NO = table.Column<int>(nullable: true),
                    INPUT_TYPE = table.Column<string>(nullable: true),
                    FAC_NO = table.Column<string>(nullable: true),
                    DEFECTIVE_WEIGHT = table.Column<double>(nullable: false),
                    DEFECTIVE_REASON = table.Column<string>(nullable: true),
                    EXCAVATOR_OPERATE_TIME = table.Column<DateTime>(nullable: true),
                    EXCAVATOR_OPERATE_EMPLOYEENO = table.Column<string>(nullable: true),
                    CAR_WEIGHT = table.Column<double>(nullable: true),
                    CAR_WEIGHT_TIME = table.Column<DateTime>(nullable: true),
                    TRADE_WEIGHT = table.Column<double>(nullable: true),
                    FINALE_DDEFECTIVE_WEIGHT = table.Column<double>(nullable: true),
                    UNIT_PRICE = table.Column<decimal>(nullable: false),
                    TRAFIC_UNIT_PRICE = table.Column<decimal>(nullable: true),
                    WEIGHT_PRICE = table.Column<decimal>(nullable: true),
                    DELIVERY_FEE = table.Column<decimal>(nullable: false),
                    THIRD_WEIGHT_FEE = table.Column<decimal>(nullable: false),
                    ACTUAL_PRICE = table.Column<decimal>(nullable: true),
                    HAS_TAX = table.Column<bool>(nullable: false),
                    PAY_TYPE = table.Column<string>(nullable: true),
                    PAY_TIME = table.Column<DateTime>(nullable: true),
                    CUSTOMER_UNID = table.Column<Guid>(nullable: false),
                    CONTRACT_UNID = table.Column<Guid>(nullable: true),
                    PRODUCT_ITEM_UNID = table.Column<Guid>(nullable: false),
                    CUSTOMER_NAME = table.Column<string>(nullable: true),
                    NOTE_STATUS = table.Column<int>(nullable: false),
                    REMARK = table.Column<string>(nullable: true),
                    EFFECTIVE_TIME = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseWeightNotes", x => x.ID);
                });

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
                    SALES_WEIGHT = table.Column<decimal>(nullable: false),
                    DEFECTIVE_WEIGHT = table.Column<decimal>(nullable: true),
                    SALES_UNIT_PRICE = table.Column<decimal>(nullable: false),
                    RECEIVED_UNIT_PRICE = table.Column<decimal>(nullable: true),
                    RECEIVED_TYPE = table.Column<int>(nullable: true),
                    RECEIVED_TIME = table.Column<DateTime>(nullable: true),
                    REMARK = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalesWeightNotes", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "SalesWeightNotesStepDatas",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CREATE_TIME = table.Column<DateTime>(nullable: false),
                    CREATE_EMPNO = table.Column<string>(nullable: true),
                    UPDATE_TIME = table.Column<DateTime>(nullable: false),
                    UPDATE_EMPNO = table.Column<string>(nullable: true),
                    DOC_UNID = table.Column<Guid>(nullable: false),
                    DOC_NO = table.Column<string>(nullable: true),
                    DATA_STEP = table.Column<int>(nullable: false),
                    INVOICE_PRICE = table.Column<decimal>(nullable: false),
                    INVOICEPRICE_HASTAX = table.Column<bool>(nullable: false),
                    TRAFIC_FEE = table.Column<decimal>(nullable: false),
                    TRAFICFEE_HASTAX = table.Column<bool>(nullable: false),
                    RECEIVED_PRICE = table.Column<decimal>(nullable: false),
                    UNIT_PRICE = table.Column<decimal>(nullable: false),
                    TRAFIC_UNIT_PRICE = table.Column<decimal>(nullable: true),
                    PRODUCT_ITEM_UNID = table.Column<Guid>(nullable: false),
                    SALES_WEIGHT = table.Column<double>(nullable: false),
                    DEFECTIVE_WEIGHT = table.Column<double>(nullable: false),
                    RECEIVED_TYPE = table.Column<int>(nullable: false),
                    RECEIVED_TIME = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalesWeightNotesStepDatas", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "SeqTypeConfigs",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CREATE_TIME = table.Column<DateTime>(nullable: false),
                    CREATE_EMPNO = table.Column<string>(nullable: true),
                    UPDATE_TIME = table.Column<DateTime>(nullable: false),
                    UPDATE_EMPNO = table.Column<string>(nullable: true),
                    SEQ_TYPE = table.Column<string>(nullable: true),
                    SEQ_NO = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SeqTypeConfigs", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CodeTables");

            migrationBuilder.DropTable(
                name: "CustomerCars");

            migrationBuilder.DropTable(
                name: "CustomerContractLogs");

            migrationBuilder.DropTable(
                name: "CustomerContracts");

            migrationBuilder.DropTable(
                name: "CustomerInfos");

            migrationBuilder.DropTable(
                name: "P_Inventory");

            migrationBuilder.DropTable(
                name: "ProductItems");

            migrationBuilder.DropTable(
                name: "PS_WreteOff_Record");

            migrationBuilder.DropTable(
                name: "PurchaseIngredients");

            migrationBuilder.DropTable(
                name: "PurchaseWeightNotes");

            migrationBuilder.DropTable(
                name: "SalesIngredients");

            migrationBuilder.DropTable(
                name: "SalesWeightNotes");

            migrationBuilder.DropTable(
                name: "SalesWeightNotesStepDatas");

            migrationBuilder.DropTable(
                name: "SeqTypeConfigs");
        }
    }
}
