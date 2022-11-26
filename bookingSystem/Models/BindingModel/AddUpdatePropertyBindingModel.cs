using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.BindingModel
{
    public class AddUpdateProperty
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PropertyType { get; set; }
        public string FurnishingType { get; set; }
        public int Price { get; set; }
        public int BuiltArea { get; set; }
        public string Address { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public int FloorNo { get; set; }
        public int TotalFloors { get; set; }

        public bool ReadyToMove { get; set; }
        public string MainEntrance { get; set; }
        public int Security { get; set; }
        public int Maintenance { get; set; }
         public DateTime DateOfPossession { get; set; }
        public string Description { get; set; }
        public string AppUserId { get; set; }
        public bool Publish { get; set; }
    }
}
