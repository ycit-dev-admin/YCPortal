using Microsoft.EntityFrameworkCore.Migrations;

namespace PSI.Core.Migrations
{
    public partial class customerInfoFieldchaged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompanyName",
                table: "CustomerInfos");

            migrationBuilder.DropColumn(
                name: "ContentInfo",
                table: "CustomerInfos");

            migrationBuilder.DropColumn(
                name: "CustomerName",
                table: "CustomerInfos");

            migrationBuilder.DropColumn(
                name: "IsContract",
                table: "CustomerInfos");

            migrationBuilder.DropColumn(
                name: "IsEffective",
                table: "CustomerInfos");

            migrationBuilder.DropColumn(
                name: "PsiType",
                table: "CustomerInfos");

            migrationBuilder.DropColumn(
                name: "TaxId",
                table: "CustomerInfos");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "CustomerInfos",
                newName: "TITLE");

            migrationBuilder.RenameColumn(
                name: "Remark",
                table: "CustomerInfos",
                newName: "REMARK");

            migrationBuilder.RenameColumn(
                name: "Address",
                table: "CustomerInfos",
                newName: "ADDRESS");

            migrationBuilder.AddColumn<string>(
                name: "COMPANY_NAME",
                table: "CustomerInfos",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CONTENT_INFO",
                table: "CustomerInfos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CUSTOMER_NAME",
                table: "CustomerInfos",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IS_CONTRACT",
                table: "CustomerInfos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IS_EFECTIVE",
                table: "CustomerInfos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PSI_TYPE",
                table: "CustomerInfos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TAX_ID",
                table: "CustomerInfos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "COMPANY_NAME",
                table: "CustomerInfos");

            migrationBuilder.DropColumn(
                name: "CONTENT_INFO",
                table: "CustomerInfos");

            migrationBuilder.DropColumn(
                name: "CUSTOMER_NAME",
                table: "CustomerInfos");

            migrationBuilder.DropColumn(
                name: "IS_CONTRACT",
                table: "CustomerInfos");

            migrationBuilder.DropColumn(
                name: "IS_EFECTIVE",
                table: "CustomerInfos");

            migrationBuilder.DropColumn(
                name: "PSI_TYPE",
                table: "CustomerInfos");

            migrationBuilder.DropColumn(
                name: "TAX_ID",
                table: "CustomerInfos");

            migrationBuilder.RenameColumn(
                name: "TITLE",
                table: "CustomerInfos",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "REMARK",
                table: "CustomerInfos",
                newName: "Remark");

            migrationBuilder.RenameColumn(
                name: "ADDRESS",
                table: "CustomerInfos",
                newName: "Address");

            migrationBuilder.AddColumn<string>(
                name: "CompanyName",
                table: "CustomerInfos",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ContentInfo",
                table: "CustomerInfos",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CustomerName",
                table: "CustomerInfos",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsContract",
                table: "CustomerInfos",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IsEffective",
                table: "CustomerInfos",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PsiType",
                table: "CustomerInfos",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TaxId",
                table: "CustomerInfos",
                type: "text",
                nullable: true);
        }
    }
}
