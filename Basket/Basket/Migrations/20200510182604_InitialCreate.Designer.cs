﻿// <auto-generated />
using System;
using Basket.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Basket.Migrations
{
    [DbContext(typeof(CartContext))]
    [Migration("20200510182604_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Basket.Models.Cart", b =>
                {
                    b.Property<int>("RecordId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CartId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("datetime2");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<int>("SongvId")
                        .HasColumnType("int");

                    b.HasKey("RecordId");

                    b.HasIndex("SongvId");

                    b.ToTable("Carts");
                });

            modelBuilder.Entity("Basket.Models.Song", b =>
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

            modelBuilder.Entity("Basket.Models.Cart", b =>
                {
                    b.HasOne("Basket.Models.Song", "Song")
                        .WithMany()
                        .HasForeignKey("SongvId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
