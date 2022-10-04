using System.ComponentModel.DataAnnotations;

namespace bookingSystem.Models
{
    public class FurnishingType : BaseEntity
    {
        [Required]
        public string Name { get; set; }
    }
}