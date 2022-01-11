using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Core.Entities;
using PSI.Models.VEModels;

namespace PSI.Areas.Purchase.Models
{
    public class Page_Purchase_WeightNoteList
    {
        // Entities
        public List<VE_PurchaseWeightNote> VE_PurchaseWeightNoteLs { get; set; }



        // Page
        public List<SelectListItem> CustomerInfoItems { set; get; }
        public List<SelectListItem> PayTypeItems { set; get; }
        public List<SelectListItem> ProductItemItems { set; get; }
        public List<PurchaseIngredient> PIngredientLs { set; get; }

    }
}
