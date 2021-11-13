using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Models.VEModels;

namespace PSI.Models.PageModels
{
    public class Page_Purchase_WeightNoteList
    {
        // Entities
        public List<VE_PurchaseWeightNote> VE_PurchaseWeightNoteLs { get; set; }



        // Page
        public List<SelectListItem> CustomerInfoItems { set; get; }
        public List<SelectListItem> PsiTypeItems { set; get; }
        public List<SelectListItem> ProductItemItems { set; get; }

    }
}
