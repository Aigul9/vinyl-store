using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Basket.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Songs",
                columns: table => new
                {
                    vId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    vArtist = table.Column<string>(nullable: true),
                    vAlbum = table.Column<string>(nullable: true),
                    vBarcode = table.Column<string>(nullable: true),
                    vCatalogNo = table.Column<string>(nullable: true),
                    vLastReleaseYear = table.Column<string>(nullable: true),
                    vReleaseYear = table.Column<string>(nullable: true),
                    vFormat = table.Column<string>(nullable: true),
                    vLabel = table.Column<string>(nullable: true),
                    vCountry = table.Column<string>(nullable: true),
                    vTop = table.Column<string>(nullable: true),
                    vState = table.Column<string>(nullable: true),
                    vMusicalStyle = table.Column<string>(nullable: true),
                    vMarks = table.Column<string>(nullable: true),
                    vPrice = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Songs", x => x.vId);
                });

            migrationBuilder.CreateTable(
                name: "Carts",
                columns: table => new
                {
                    RecordId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CartId = table.Column<string>(nullable: true),
                    SongvId = table.Column<int>(nullable: false),
                    Quantity = table.Column<int>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Carts", x => x.RecordId);
                    table.ForeignKey(
                        name: "FK_Carts_Songs_SongvId",
                        column: x => x.SongvId,
                        principalTable: "Songs",
                        principalColumn: "vId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Carts_SongvId",
                table: "Carts",
                column: "SongvId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Carts");

            migrationBuilder.DropTable(
                name: "Songs");
        }
    }
}
