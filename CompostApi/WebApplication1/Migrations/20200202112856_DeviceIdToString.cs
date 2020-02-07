using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class DeviceIdToString : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CompostData_Devices_DeviceId",
                table: "CompostData");

            migrationBuilder.DropPrimaryKey("PK_Devices", "Devices");

            migrationBuilder.AlterColumn<string>(
                name: "Id",
                table: "Devices",
                nullable: false,
                oldClrType: typeof(Guid));

            migrationBuilder.DropIndex("IX_CompostData_DeviceId", "CompostData");

            migrationBuilder.AlterColumn<string>(
                name: "DeviceId",
                table: "CompostData",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AddPrimaryKey("PK_Devices", "Devices", "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CompostData_Devices_DeviceId",
                table: "CompostData",
                column: "DeviceId",
                principalTable: "Devices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CompostData_Devices_DeviceId",
                table: "CompostData");

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "Devices",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<Guid>(
                name: "DeviceId",
                table: "CompostData",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CompostData_Devices_DeviceId",
                table: "CompostData",
                column: "DeviceId",
                principalTable: "Devices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
