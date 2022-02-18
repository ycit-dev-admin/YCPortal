using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;

namespace PSI.Models.VEModels
{
    public class VE_PurchaseIngredient_Create
    {
        public long ProductId { get; set; }
        public string ItemName { get; set; }
        public double ItemPercent { get; set; }
    }

}
