using System;
using System.Collections.Generic;

namespace Models.DTO
{
    public class UserDTO
    {
        public UserDTO(string id, string fullName, string email, string userName, DateTime dateCreated, List<string> roles, string userId)
        {
            Id = id;
            FullName = fullName;
            Email = email;
            UserName = userName;
            DateCreated = dateCreated;
            Roles = roles;
            UserId = userId;
        }
        public string Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public DateTime DateCreated { get; set; }
        public string Token { get; set; }
        public List<string> Roles { get; set; }
        public string UserId { get; set; }
    }
}