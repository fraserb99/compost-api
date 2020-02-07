﻿// <auto-generated />
using System;
using CompostApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace WebApplication1.Migrations
{
    [DbContext(typeof(CompostDataContext))]
    partial class CompostDataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.11-servicing-32099")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CompostApi.Models.CompostData", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created");

                    b.Property<string>("DeviceId");

                    b.Property<double>("Temperature");

                    b.HasKey("Id");

                    b.HasIndex("DeviceId");

                    b.ToTable("CompostData");
                });

            modelBuilder.Entity("WebApplication1.Slices.Devices.Models.Device", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<Guid?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Devices");
                });

            modelBuilder.Entity("WebApplication1.Slices.Users.Models.DeviceUser", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("DeviceId");

                    b.Property<Guid?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("DeviceId");

                    b.HasIndex("UserId");

                    b.ToTable("DeviceUsers");
                });

            modelBuilder.Entity("WebApplication1.Slices.Users.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("Password");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("CompostApi.Models.CompostData", b =>
                {
                    b.HasOne("WebApplication1.Slices.Devices.Models.Device")
                        .WithMany("CompostData")
                        .HasForeignKey("DeviceId");
                });

            modelBuilder.Entity("WebApplication1.Slices.Devices.Models.Device", b =>
                {
                    b.HasOne("WebApplication1.Slices.Users.Models.User")
                        .WithMany("Devices")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("WebApplication1.Slices.Users.Models.DeviceUser", b =>
                {
                    b.HasOne("WebApplication1.Slices.Devices.Models.Device", "Device")
                        .WithMany("DeviceUsers")
                        .HasForeignKey("DeviceId");

                    b.HasOne("WebApplication1.Slices.Users.Models.User", "User")
                        .WithMany("DeviceUsers")
                        .HasForeignKey("UserId");
                });
#pragma warning restore 612, 618
        }
    }
}
