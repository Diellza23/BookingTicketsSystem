﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace bookingSystem.Dtos
{
    public class PropertyDto
    {
        public int Id { get; set; }
        public int SellRent { get; set; }
        public string Name { get; set; }
        public int PropertyTypeId { get; set; }
        public int FurnishingTypeId { get; set; }
        public int Price { get; set; }
        public int BHK { get; set; }
        public int BuiltArea { get; set; }
        public int CityId { get; set; }
        public bool ReadyToMove { get; set; }
        public int CarpetArea { get; set; }
        public string Address { get; set; }
        public string Address2 { get; set; }
        public int FloorNo { get; set; }
        public int TotalFloors { get; set; }
        public string MainEntrance { get; set; }
        public int Security { get; set; } = 0;  //vetem nese shte available per rent
        public bool Gated { get; set; }
        public int Maintenance { get; set; } = 0; //this one too for rent
        public DateTime EstPossessionOn { get; set; }
        public int Age { get; set; } = 0;
        public string Description { get; set; }
    }
}
