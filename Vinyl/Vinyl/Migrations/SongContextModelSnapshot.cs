﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Vinyl.Contexts;

namespace Vinyl.Migrations
{
    [DbContext(typeof(SongContext))]
    partial class SongContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Vinyl.Models.Song", b =>
                {
                    b.Property<int>("vId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("vAlbum")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("vArtist")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("vBarcode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("vCatalogNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("vCountry")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("vFormat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("vLabel")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("vLastReleaseYear")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("vMarks")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("vMusicalStyle")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("vPrice")
                        .HasColumnType("int");

                    b.Property<string>("vReleaseYear")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("vState")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("vTop")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("vId");

                    b.ToTable("Songs");
                });
#pragma warning restore 612, 618
        }
    }
}
