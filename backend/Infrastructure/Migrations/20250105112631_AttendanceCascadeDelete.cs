using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AttendanceCascadeDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attendances_Children_ChildId",
                table: "Attendances");

            migrationBuilder.AddForeignKey(
                name: "FK_Attendances_Children_ChildId",
                table: "Attendances",
                column: "ChildId",
                principalTable: "Children",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attendances_Children_ChildId",
                table: "Attendances");

            migrationBuilder.AddForeignKey(
                name: "FK_Attendances_Children_ChildId",
                table: "Attendances",
                column: "ChildId",
                principalTable: "Children",
                principalColumn: "Id");
        }
    }
}
