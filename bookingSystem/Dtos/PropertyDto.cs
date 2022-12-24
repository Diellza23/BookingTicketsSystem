using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace bookingSystem.Dtos
{
    public class PropertyDto
    {
        public int Id { get; set; }
        public int SellRent { get; set; }
        public string Name { get; set; }

        [ForeignKey("PropertyType")]
        public int PropertyTypeId { get; set; }
        [ForeignKey("FurnishingType")]
        public int FurnishingTypeId { get; set; }
        public int Price { get; set; }
        public int BHK { get; set; }
        public int BuiltArea { get; set; }
        [ForeignKey("City")]
        public int CityId { get; set; }
        public bool ReadyToMove { get; set; }
        public int CarpetArea { get; set; }
        public string Address { get; set; }
        public string Address2 { get; set; }
        public int FloorNo { get; set; }
        public int TotalFloors { get; set; }
        public string MainEntrance { get; set; }
        public int Security { get; set; } = 0;
        public bool Gated { get; set; }
        public int Maintenance { get; set; }
        public DateTime EstPossessionOn { get; set; }
        public int Age { get; set; }
        public string Description { get; set; }
        public string AuthorName { get; set; }
        public string AppUserId { get; set; }

        // // public int Age { get; set; }
        // public string Description { get; set; }

    }
}