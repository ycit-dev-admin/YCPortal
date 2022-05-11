using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace PSI.Core.Migrations
{
    public partial class adjustalltabletoupcase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_SeqTypeConfigs",
                table: "SeqTypeConfigs");

            migrationBuilder.DropColumn(
                name: "SeqType",
                table: "SeqTypeConfigs");

            migrationBuilder.DropColumn(
                name: "SeqNo",
                table: "SeqTypeConfigs");

            migrationBuilder.DropColumn(
                name: "ActualPrice",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "CarNo",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "CarWeight",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "CarWeightTime",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "CustomerName",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "DefectiveReason",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "DefectiveWeight",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "DeliveryFee",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "DocNo",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "EffectiveTime",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "ExcavatorOpEmpNo",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "ExcavatorOpTime",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "FacNo",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "FinalDefectiveWeight",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "FullWeight",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "FullWeightTime",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "HasTax",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "InputType",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "NoteStatus",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "PayTime",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "PayType",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "ScaleNo",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "ThirdWeightFee",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "TradeWeight",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "TraficUnitPrice",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "UnitPrice",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "WeightPrice",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "ItemName",
                table: "PurchaseIngredients");

            migrationBuilder.DropColumn(
                name: "ItemPercent",
                table: "PurchaseIngredients");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "PurchaseIngredients");

            migrationBuilder.DropColumn(
                name: "PurchaseWeighNoteId",
                table: "PurchaseIngredients");

            migrationBuilder.DropColumn(
                name: "CONTRACT_GUID",
                table: "CustomerContractLogs");

            migrationBuilder.DropColumn(
                name: "PSI_DOC_GUID",
                table: "CustomerContractLogs");

            migrationBuilder.DropColumn(
                name: "CodeGroup",
                table: "CodeTables");

            migrationBuilder.DropColumn(
                name: "CodeText",
                table: "CodeTables");

            migrationBuilder.DropColumn(
                name: "CodeValue",
                table: "CodeTables");

            migrationBuilder.DropColumn(
                name: "IsEffective",
                table: "CodeTables");

            migrationBuilder.RenameColumn(
                name: "Remark",
                table: "PurchaseWeightNotes",
                newName: "REMARK");

            migrationBuilder.RenameColumn(
                name: "Sort",
                table: "CodeTables",
                newName: "SORT");

            migrationBuilder.AddColumn<long>(
                name: "ID",
                table: "SeqTypeConfigs",
                nullable: false,
                defaultValue: 0L)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<string>(
                name: "CREATE_EMPNO",
                table: "SeqTypeConfigs",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CREATE_TIME",
                table: "SeqTypeConfigs",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "SEQ_NO",
                table: "SeqTypeConfigs",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "SEQ_TYPE",
                table: "SeqTypeConfigs",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UPDATE_EMPNO",
                table: "SeqTypeConfigs",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UPDATE_TIME",
                table: "SeqTypeConfigs",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<decimal>(
                name: "ACTUAL_PRICE",
                table: "PurchaseWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CAR_NO",
                table: "PurchaseWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "CAR_WEIGHT",
                table: "PurchaseWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CAR_WEIGHT_TIME",
                table: "PurchaseWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CUSTOMER_NAME",
                table: "PurchaseWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "CUSTOMER_UNID",
                table: "PurchaseWeightNotes",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "DEFECTIVE_REASON",
                table: "PurchaseWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "DEFECTIVE_WEIGHT",
                table: "PurchaseWeightNotes",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<decimal>(
                name: "DELIVERY_FEE",
                table: "PurchaseWeightNotes",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "DOC_NO",
                table: "PurchaseWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EFFECTIVE_TIME",
                table: "PurchaseWeightNotes",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "EXCAVATOR_OPERATE_EMPLOYEENO",
                table: "PurchaseWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EXCAVATOR_OPERATE_TIME",
                table: "PurchaseWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FAC_NO",
                table: "PurchaseWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "FINALE_DDEFECTIVE_WEIGHT",
                table: "PurchaseWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "FULL_WEIGHT",
                table: "PurchaseWeightNotes",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<DateTime>(
                name: "FULL_WEIGHT_TIME",
                table: "PurchaseWeightNotes",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "HAS_TAX",
                table: "PurchaseWeightNotes",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "INPUT_TYPE",
                table: "PurchaseWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NOTE_STATUS",
                table: "PurchaseWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "PAY_TIME",
                table: "PurchaseWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PAY_TYPE",
                table: "PurchaseWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SCALE_NO",
                table: "PurchaseWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "THIRD_WEIGHT_FEE",
                table: "PurchaseWeightNotes",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<double>(
                name: "TRADE_WEIGHT",
                table: "PurchaseWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "TRAFIC_UNIT_PRICE",
                table: "PurchaseWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UNID",
                table: "PurchaseWeightNotes",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<decimal>(
                name: "UNIT_PRICE",
                table: "PurchaseWeightNotes",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "WEIGHT_PRICE",
                table: "PurchaseWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ITEM_NAME",
                table: "PurchaseIngredients",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "ITEM_PERCENT",
                table: "PurchaseIngredients",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<Guid>(
                name: "PRODUCT_UNID",
                table: "PurchaseIngredients",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "PURCHASE_WEIGHTNOTE_UNID",
                table: "PurchaseIngredients",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "CONTRACT_UNID",
                table: "CustomerContractLogs",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "PSI_DOC_UNID",
                table: "CustomerContractLogs",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "CODE_GROUP",
                table: "CodeTables",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CODE_TEXT",
                table: "CodeTables",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CODE_VALUE",
                table: "CodeTables",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "IS_EFFECTIVE",
                table: "CodeTables",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_SeqTypeConfigs",
                table: "SeqTypeConfigs",
                column: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_SeqTypeConfigs",
                table: "SeqTypeConfigs");

            migrationBuilder.DropColumn(
                name: "ID",
                table: "SeqTypeConfigs");

            migrationBuilder.DropColumn(
                name: "CREATE_EMPNO",
                table: "SeqTypeConfigs");

            migrationBuilder.DropColumn(
                name: "CREATE_TIME",
                table: "SeqTypeConfigs");

            migrationBuilder.DropColumn(
                name: "SEQ_NO",
                table: "SeqTypeConfigs");

            migrationBuilder.DropColumn(
                name: "SEQ_TYPE",
                table: "SeqTypeConfigs");

            migrationBuilder.DropColumn(
                name: "UPDATE_EMPNO",
                table: "SeqTypeConfigs");

            migrationBuilder.DropColumn(
                name: "UPDATE_TIME",
                table: "SeqTypeConfigs");

            migrationBuilder.DropColumn(
                name: "ACTUAL_PRICE",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "CAR_NO",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "CAR_WEIGHT",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "CAR_WEIGHT_TIME",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "CUSTOMER_NAME",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "CUSTOMER_UNID",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "DEFECTIVE_REASON",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "DEFECTIVE_WEIGHT",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "DELIVERY_FEE",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "DOC_NO",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "EFFECTIVE_TIME",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "EXCAVATOR_OPERATE_EMPLOYEENO",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "EXCAVATOR_OPERATE_TIME",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "FAC_NO",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "FINALE_DDEFECTIVE_WEIGHT",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "FULL_WEIGHT",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "FULL_WEIGHT_TIME",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "HAS_TAX",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "INPUT_TYPE",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "NOTE_STATUS",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "PAY_TIME",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "PAY_TYPE",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "SCALE_NO",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "THIRD_WEIGHT_FEE",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "TRADE_WEIGHT",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "TRAFIC_UNIT_PRICE",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "UNID",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "UNIT_PRICE",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "WEIGHT_PRICE",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "ITEM_NAME",
                table: "PurchaseIngredients");

            migrationBuilder.DropColumn(
                name: "ITEM_PERCENT",
                table: "PurchaseIngredients");

            migrationBuilder.DropColumn(
                name: "PRODUCT_UNID",
                table: "PurchaseIngredients");

            migrationBuilder.DropColumn(
                name: "PURCHASE_WEIGHTNOTE_UNID",
                table: "PurchaseIngredients");

            migrationBuilder.DropColumn(
                name: "CONTRACT_UNID",
                table: "CustomerContractLogs");

            migrationBuilder.DropColumn(
                name: "PSI_DOC_UNID",
                table: "CustomerContractLogs");

            migrationBuilder.DropColumn(
                name: "CODE_GROUP",
                table: "CodeTables");

            migrationBuilder.DropColumn(
                name: "CODE_TEXT",
                table: "CodeTables");

            migrationBuilder.DropColumn(
                name: "CODE_VALUE",
                table: "CodeTables");

            migrationBuilder.DropColumn(
                name: "IS_EFFECTIVE",
                table: "CodeTables");

            migrationBuilder.RenameColumn(
                name: "REMARK",
                table: "PurchaseWeightNotes",
                newName: "Remark");

            migrationBuilder.RenameColumn(
                name: "SORT",
                table: "CodeTables",
                newName: "Sort");

            migrationBuilder.AddColumn<string>(
                name: "SeqType",
                table: "SeqTypeConfigs",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<long>(
                name: "SeqNo",
                table: "SeqTypeConfigs",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<decimal>(
                name: "ActualPrice",
                table: "PurchaseWeightNotes",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CarNo",
                table: "PurchaseWeightNotes",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "CarWeight",
                table: "PurchaseWeightNotes",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CarWeightTime",
                table: "PurchaseWeightNotes",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "CustomerId",
                table: "PurchaseWeightNotes",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "CustomerName",
                table: "PurchaseWeightNotes",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DefectiveReason",
                table: "PurchaseWeightNotes",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "DefectiveWeight",
                table: "PurchaseWeightNotes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<decimal>(
                name: "DeliveryFee",
                table: "PurchaseWeightNotes",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "DocNo",
                table: "PurchaseWeightNotes",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EffectiveTime",
                table: "PurchaseWeightNotes",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "ExcavatorOpEmpNo",
                table: "PurchaseWeightNotes",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ExcavatorOpTime",
                table: "PurchaseWeightNotes",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FacNo",
                table: "PurchaseWeightNotes",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "FinalDefectiveWeight",
                table: "PurchaseWeightNotes",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "FullWeight",
                table: "PurchaseWeightNotes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<DateTime>(
                name: "FullWeightTime",
                table: "PurchaseWeightNotes",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "HasTax",
                table: "PurchaseWeightNotes",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "InputType",
                table: "PurchaseWeightNotes",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NoteStatus",
                table: "PurchaseWeightNotes",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "PayTime",
                table: "PurchaseWeightNotes",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PayType",
                table: "PurchaseWeightNotes",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ScaleNo",
                table: "PurchaseWeightNotes",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ThirdWeightFee",
                table: "PurchaseWeightNotes",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<double>(
                name: "TradeWeight",
                table: "PurchaseWeightNotes",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "TraficUnitPrice",
                table: "PurchaseWeightNotes",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "UnitPrice",
                table: "PurchaseWeightNotes",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "WeightPrice",
                table: "PurchaseWeightNotes",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ItemName",
                table: "PurchaseIngredients",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "ItemPercent",
                table: "PurchaseIngredients",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<long>(
                name: "ProductId",
                table: "PurchaseIngredients",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "PurchaseWeighNoteId",
                table: "PurchaseIngredients",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<Guid>(
                name: "CONTRACT_GUID",
                table: "CustomerContractLogs",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "PSI_DOC_GUID",
                table: "CustomerContractLogs",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "CodeGroup",
                table: "CodeTables",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CodeText",
                table: "CodeTables",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CodeValue",
                table: "CodeTables",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "IsEffective",
                table: "CodeTables",
                type: "text",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_SeqTypeConfigs",
                table: "SeqTypeConfigs",
                column: "SeqType");
        }
    }
}
