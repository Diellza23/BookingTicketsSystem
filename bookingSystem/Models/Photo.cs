using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace bookingSystem.Models
{
    [Table("Photos")]
    public class Photo : BaseEntity
    {
        [Required]
        public string PublicId { get; set; }
        [Required]
        public string ImageUrl { get; set; }
        public bool IsPrimary { get; set; }
        public int ProppertyId { get; set; }
        public Propperty Propperty { get; set; }
    }
}