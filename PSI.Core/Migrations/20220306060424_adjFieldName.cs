using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations
{
    public partial class adjFieldName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreateEmpNo",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "CreateTime",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "UpdateEmpNo",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "UpdateTime",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "CreateEmpNo",
                table: "PurchaseIngredients");

            migrationBuilder.DropColumn(
                name: "CreateTime",
                table: "PurchaseIngredients");

            migrationBuilder.DropColumn(
                name: "UpdateEmpNo",
                table: "PurchaseIngredients");

            migrationBuilder.DropColumn(
                name: "UpdateTime",
                table: "PurchaseIngredients");

            migrationBuilder.DropColumn(
                name: "CreateEmpNo",
                table: "ProductItems");

            migrationBuilder.DropColumn(
                name: "CreateTime",
                table: "ProductItems");

            migrationBuilder.DropColumn(
                name: "UpdateEmpNo",
                table: "ProductItems");

            migrationBuilder.DropColumn(
                name: "UpdateTime",
                table: "ProductItems");

            migrationBuilder.DropColumn(
                name: "CreateEmpNo",
                table: "CustomerInfos");

            migrationBuilder.DropColumn(
                name: "CreateTime",
                table: "CustomerInfos");

            migrationBuilder.DropColumn(
                name: "UpdateEmpNo",
                table: "CustomerInfos");

            migrationBuilder.DropColumn(
                name: "UpdateTime",
                table: "CustomerInfos");

            migrationBuilder.DropColumn(
                name: "CreateEmpNo",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "CreateTime",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "UpdateEmpNo",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "UpdateTime",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "CarName",
                table: "CustomerCars");

            migrationBuilder.DropColumn(
                name: "CreateEmpNo",
                table: "CustomerCars");

            migrationBuilder.DropColumn(
                name: "CreateTime",
                table: "CustomerCars");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "CustomerCars");

            migrationBuilder.DropColumn(
                name: "IsEffective",
                table: "CustomerCars");

            migrationBuilder.DropColumn(
                name: "UpdateEmpNo",
                table: "CustomerCars");

            migrationBuilder.DropColumn(
                name: "UpdateTime",
                table: "CustomerCars");

            migrationBuilder.DropColumn(
                name: "CreateEmpNo",
                table: "CodeTables");

            migrationBuilder.DropColumn(
                name: "CreateTime",
                table: "CodeTables");

            migrationBuilder.DropColumn(
                name: "UpdateEmpNo",
                table: "CodeTables");

            migrationBuilder.DropColumn(
                name: "UpdateTime",
                table: "CodeTables");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "PurchaseWeightNotes",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "PurchaseIngredients",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "ProductItems",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "CustomerInfos",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "CustomerContracts",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "Remark",
                table: "CustomerCars",
                newName: "REMARK");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "CustomerCars",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "CodeTables",
                newName: "ID");

            migrationBuilder.AddColumn<string>(
                name: "CREATE_EMPNO",
                table: "PurchaseWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CREATE_TIME",
                table: "PurchaseWeightNotes",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "UPDATE_EMPNO",
                table: "PurchaseWeightNotes",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UPDATE_TIME",
                table: "PurchaseWeightNotes",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CREATE_EMPNO",
                table: "PurchaseIngredients",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CREATE_TIME",
                table: "PurchaseIngredients",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "UPDATE_EMPNO",
                table: "PurchaseIngredients",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UPDATE_TIME",
                table: "PurchaseIngredients",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CREATE_EMPNO",
                table: "ProductItems",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CREATE_TIME",
                table: "ProductItems",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "UPDATE_EMPNO",
                table: "ProductItems",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UPDATE_TIME",
                table: "ProductItems",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CREATE_EMPNO",
                table: "CustomerInfos",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CREATE_TIME",
                table: "CustomerInfos",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "CUSTOMER_GUID",
                table: "CustomerInfos",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "UPDATE_EMPNO",
                table: "CustomerInfos",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UPDATE_TIME",
                table: "CustomerInfos",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CREATE_EMPNO",
                table: "CustomerContracts",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CREATE_TIME",
                table: "CustomerContracts",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "UPDATE_EMPNO",
                table: "CustomerContracts",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UPDATE_TIME",
                table: "CustomerContracts",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "CAR_GUID",
                table: "CustomerCars",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "CAR_NAME",
                table: "CustomerCars",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CREATE_EMPNO",
                table: "CustomerCars",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CREATE_TIME",
                table: "CustomerCars",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "CUSTOMER_GUID",
                table: "CustomerCars",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<long>(
                name: "CUSTOMER_ID",
                table: "CustomerCars",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "IS_EFFECTIVE",
                table: "CustomerCars",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UPDATE_EMPNO",
                table: "CustomerCars",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UPDATE_TIME",
                table: "CustomerCars",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CREATE_EMPNO",
                table: "CodeTables",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CREATE_TIME",
                table: "CodeTables",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "UPDATE_EMPNO",
                table: "CodeTables",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UPDATE_TIME",
                table: "CodeTables",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CREATE_EMPNO",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "CREATE_TIME",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "UPDATE_EMPNO",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "UPDATE_TIME",
                table: "PurchaseWeightNotes");

            migrationBuilder.DropColumn(
                name: "CREATE_EMPNO",
                table: "PurchaseIngredients");

            migrationBuilder.DropColumn(
                name: "CREATE_TIME",
                table: "PurchaseIngredients");

            migrationBuilder.DropColumn(
                name: "UPDATE_EMPNO",
                table: "PurchaseIngredients");

            migrationBuilder.DropColumn(
                name: "UPDATE_TIME",
                table: "PurchaseIngredients");

            migrationBuilder.DropColumn(
                name: "CREATE_EMPNO",
                table: "ProductItems");

            migrationBuilder.DropColumn(
                name: "CREATE_TIME",
                table: "ProductItems");

            migrationBuilder.DropColumn(
                name: "UPDATE_EMPNO",
                table: "ProductItems");

            migrationBuilder.DropColumn(
                name: "UPDATE_TIME",
                table: "ProductItems");

            migrationBuilder.DropColumn(
                name: "CREATE_EMPNO",
                table: "CustomerInfos");

            migrationBuilder.DropColumn(
                name: "CREATE_TIME",
                table: "CustomerInfos");

            migrationBuilder.DropColumn(
                name: "CUSTOMER_GUID",
                table: "CustomerInfos");

            migrationBuilder.DropColumn(
                name: "UPDATE_EMPNO",
                table: "CustomerInfos");

            migrationBuilder.DropColumn(
                name: "UPDATE_TIME",
                table: "CustomerInfos");

            migrationBuilder.DropColumn(
                name: "CREATE_EMPNO",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "CREATE_TIME",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "UPDATE_EMPNO",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "UPDATE_TIME",
                table: "CustomerContracts");

            migrationBuilder.DropColumn(
                name: "CAR_GUID",
                table: "CustomerCars");

            migrationBuilder.DropColumn(
                name: "CAR_NAME",
                table: "CustomerCars");

            migrationBuilder.DropColumn(
                name: "CREATE_EMPNO",
                table: "CustomerCars");

            migrationBuilder.DropColumn(
                name: "CREATE_TIME",
                table: "CustomerCars");

            migrationBuilder.DropColumn(
                name: "CUSTOMER_GUID",
                table: "CustomerCars");

            migrationBuilder.DropColumn(
                name: "CUSTOMER_ID",
                table: "CustomerCars");

            migrationBuilder.DropColumn(
                name: "IS_EFFECTIVE",
                table: "CustomerCars");

            migrationBuilder.DropColumn(
                name: "UPDATE_EMPNO",
                table: "CustomerCars");

            migrationBuilder.DropColumn(
                name: "UPDATE_TIME",
                table: "CustomerCars");

            migrationBuilder.DropColumn(
                name: "CREATE_EMPNO",
                table: "CodeTables");

            migrationBuilder.DropColumn(
                name: "CREATE_TIME",
                table: "CodeTables");

            migrationBuilder.DropColumn(
                name: "UPDATE_EMPNO",
                table: "CodeTables");

            migrationBuilder.DropColumn(
                name: "UPDATE_TIME",
                table: "CodeTables");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "PurchaseWeightNotes",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "PurchaseIngredients",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "ProductItems",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "CustomerInfos",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "CustomerContracts",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "REMARK",
                table: "CustomerCars",
                newName: "Remark");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "CustomerCars",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "CodeTables",
                newName: "Id");

            migrationBuilder.AddColumn<string>(
                name: "CreateEmpNo",
                table: "PurchaseWeightNotes",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateTime",
                table: "PurchaseWeightNotes",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "UpdateEmpNo",
                table: "PurchaseWeightNotes",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdateTime",
                table: "PurchaseWeightNotes",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreateEmpNo",
                table: "PurchaseIngredients",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateTime",
                table: "PurchaseIngredients",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "UpdateEmpNo",
                table: "PurchaseIngredients",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdateTime",
                table: "PurchaseIngredients",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreateEmpNo",
                table: "ProductItems",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateTime",
                table: "ProductItems",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "UpdateEmpNo",
                table: "ProductItems",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdateTime",
                table: "ProductItems",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreateEmpNo",
                table: "CustomerInfos",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateTime",
                table: "CustomerInfos",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "UpdateEmpNo",
                table: "CustomerInfos",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdateTime",
                table: "CustomerInfos",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreateEmpNo",
                table: "CustomerContracts",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateTime",
                table: "CustomerContracts",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "UpdateEmpNo",
                table: "CustomerContracts",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdateTime",
                table: "CustomerContracts",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CarName",
                table: "CustomerCars",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreateEmpNo",
                table: "CustomerCars",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateTime",
                table: "CustomerCars",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "CustomerId",
                table: "CustomerCars",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "IsEffective",
                table: "CustomerCars",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdateEmpNo",
                table: "CustomerCars",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdateTime",
                table: "CustomerCars",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreateEmpNo",
                table: "CodeTables",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateTime",
                table: "CodeTables",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "UpdateEmpNo",
                table: "CodeTables",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdateTime",
                table: "CodeTables",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
