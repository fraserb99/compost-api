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

                    b.Property<Guid>("DeviceId");

                    b.Property<double>("Temperature");

                    b.HasKey("Id");

                    b.HasIndex("DeviceId");

                    b.ToTable("CompostData");
                });

            modelBuilder.Entity("WebApplication1.Slices.Devices.Models.Device", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Devices");
                });

            modelBuilder.Entity("CompostApi.Models.CompostData", b =>
                {
                    b.HasOne("WebApplication1.Slices.Devices.Models.Device", "Device")
                        .WithMany("CompostData")
                        .HasForeignKey("DeviceId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
