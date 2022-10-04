using System.ComponentModel.DataAnnotations;

namespace bookingSystem.Models
{
    public class PropertyType : BaseEntity
    {
        [Required]
        public string Name { get; set; }
    }
}