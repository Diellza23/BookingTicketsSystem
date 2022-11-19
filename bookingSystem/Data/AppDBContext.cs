
// using Microsoft.AspNetCore.Identity;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.AspNetCore.Identity;

// using Microsoft.AspNetCore.Identity;

using bookingSystem.Models;
using Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Claim.Data
{
    public class AppDBContext : IdentityDbContext<AppUser, IdentityRole, string>
    {

        public AppDBContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<City> Cities { get; set; }
        public DbSet<Propperty> Propperties { get; set; }
        public DbSet<PropertyType> PropertyTypes { get; set; }
        public DbSet<FurnishingType> FurnishingTypes { get; set; }

    }
}
