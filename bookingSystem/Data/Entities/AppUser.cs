using System;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using Data.Entities;

namespace Data.Entities
{
    public class AppUser : IdentityUser
    {
        public string FullName { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        // public List<Property> Properties { get; set; }

    }
}