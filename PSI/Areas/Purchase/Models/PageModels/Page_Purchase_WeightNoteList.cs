using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Core.Enums;
using PSI.Models.VEModels;

namespace PSI.Areas.Purchase.Models.PageModels
{
    public class Page_Purchase_WeightNoteList
    {
        public string FacSite { get; set; }
        public int? UserAuthorityLevel { get; set; }
        // Entities
        public List<VE_PurchaseWeightNote> VE_PurchaseWeightNoteLs { get; set; }

        // Page
        public List<SelectListItem> CustomerInfoItems { get; set; }
        public List<SelectListItem> PayTypeItems { get; set; }
        public List<SelectListItem> ProductItemItems { get; set; }
        public List<VE_PurchaseIngredient> PIngredientLs { get; set; }
        public List<SelectListItem> FacSiteItems { get; set; }
    }
}
