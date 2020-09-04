namespace MyBlog.Server.Data.Migrations
{
    using System;

    using Microsoft.EntityFrameworkCore.Migrations;

    public partial class EditArticlesTagsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "ArticlesTags");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "ArticlesTags");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "ArticlesTags");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "ArticlesTags");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "ArticlesTags");

            migrationBuilder.DropColumn(
                name: "ModifiedOn",
                table: "ArticlesTags");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "ArticlesTags",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "ArticlesTags",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "ArticlesTags",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "ArticlesTags",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "ArticlesTags",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedOn",
                table: "ArticlesTags",
                type: "datetime2",
                nullable: true);
        }
    }
}
