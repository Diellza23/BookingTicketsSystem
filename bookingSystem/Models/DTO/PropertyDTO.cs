using System;

namespace DTO
{
    public class PropertyDTO
    {
        public int Id { get; set; }
        public int SellRent { get; set; }
        public string Name { get; set; }
        public int PropertyType { get; set; }
        public int FurnishingType { get; set; }
        public int Price { get; set; }
        public int BuiltArea { get; set; }
        public string Address { get; set; }
        public string Address2 { get; set; }
        public int City { get; set; }
        public int FloorNo { get; set; }
        public int TotalFloors { get; set; }

        public bool ReadyToMove { get; set; }
        public string MainEntrance { get; set; }
        public int Security { get; set; }
        public int Maintenance { get; set; }
        public DateTime DateOfPossession { get; set; }
        public string Description { get; set; }
        public bool Publish { get; set; }
        public string AuthorName { get; set; }
        public DateTime Created { get; set; }
        public string AppUserId { get; set; }
    }
}