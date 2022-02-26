using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Areas.Purchase.Models.IVE_Models;
using PSI.Core.Entities;
using PSI.Models.VEModels;

namespace PSI.Areas.Purchase.Models.PageModels
{
    public class Page_Purchase_WeightNoteList
    {
        // Entities
        public List<VE_PurchaseWeightNote> VE_PurchaseWeightNoteLs { get; set; }

        // Page
        public List<SelectListItem> CustomerInfoItems { get; set; }
        public List<SelectListItem> PayTypeItems { get; set; }
        public List<SelectListItem> ProductItemItems { get; set; }
        public List<PurchaseIngredient> PIngredientLs { get; set; }
    }
}
