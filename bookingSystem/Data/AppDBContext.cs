
// using Microsoft.AspNetCore.Identity;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.AspNetCore.Identity;

// using Microsoft.AspNetCore.Identity;

using bookingSystem.Models;
using Claim.Data.Entities;
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
        public DbSet<City> Cities {get;set;}
    }
}
