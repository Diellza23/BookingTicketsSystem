using System;
using System.Collections.Generic;

namespace Models.DTO
{
    public class UserDTO
    {
        public UserDTO(string id, string fullName, string email, string userName, DateTime dateCreated, List<string> roles, string userId, string phoneNumber, string address, string state, string country)
        {
            Id = id;
            FullName = fullName;
            Email = email;
            UserName = userName;
            DateCreated = dateCreated;
            Roles = roles;
            UserId = userId;
            PhoneNumber = phoneNumber;
            Address = address;
            State = state;
            Country = country;

        }
        public string Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public DateTime DateCreated { get; set; }
        public string Token { get; set; }
        public List<string> Roles { get; set; }
        public string UserId { get; set; }

        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
    }
}