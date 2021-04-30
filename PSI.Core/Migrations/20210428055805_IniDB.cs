using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace PSI.Core.Migrations
{
    public partial class IniDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PurchaseWeightNotes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CarNo = table.Column<string>(nullable: true),
                    FullWeight = table.Column<float>(nullable: false),
                    FullWeightTime = table.Column<DateTime>(nullable: false),
                    ScaleNo = table.Column<string>(nullable: true),
                    InputType = table.Column<string>(nullable: true),
                    FacNo = table.Column<string>(nullable: true),
                    Ingredient = table.Column<string>(nullable: true),
                    DefectiveWeight = table.Column<float>(nullable: false),
                    DefectiveReason = table.Column<string>(nullable: true),
                    ExcavatorOpTime = table.Column<DateTime>(nullable: false),
                    ExcavatorOpEmpNo = table.Column<string>(nullable: true),
                    CarWeight = table.Column<float>(nullable: false),
                    CarWeightTime = table.Column<DateTime>(nullable: false),
                    TradeWeight = table.Column<float>(nullable: false),
                    FinalDefectiveWeight = table.Column<float>(nullable: false),
                    UnitPrice = table.Column<decimal>(nullable: false),
                    WantPrice = table.Column<decimal>(nullable: false),
                    ActualPrice = table.Column<decimal>(nullable: false),
                    HasTax = table.Column<bool>(nullable: false),
                    ThirdWeightFee = table.Column<decimal>(nullable: false),
                    SettleType = table.Column<string>(nullable: true),
                    TraficFee = table.Column<decimal>(nullable: false),
                    PayType = table.Column<string>(nullable: true),
                    CustomerId = table.Column<int>(nullable: false),
                    CustomerName = table.Column<string>(nullable: true),
                    NoteStatus = table.Column<string>(nullable: true),
                    Remark = table.Column<string>(nullable: true),
                    EffectiveTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseWeightNotes", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PurchaseWeightNotes");
        }
    }
}
