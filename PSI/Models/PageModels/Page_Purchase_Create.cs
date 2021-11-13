using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Models.VEModels;
using System;
using System.Collections.Generic;

namespace PSI.Models.PageModels
{
    public class Page_Purchase_Create
    {
        // Post
        public string SelectPurchaseDetailInfos { get; set; }

        // Entities
        public VE_PurchaseWeightNote VE_PurchaseWeightNote { get; set; }


        //public List<PurchaseDetailInfo> PurchaseDetailInfos { get; set; }

        // Page
        public List<SelectListItem> CustomerInfoItems { set; get; }
        public List<SelectListItem> PsiTypeItems { set; get; }
        public List<SelectListItem> ProductItemItems { set; get; }

    }

    public class VE_PurchaseIngredient
    {
        public string Value { get; set; }
        public string Name { get; set; }
        public int? Percent { get; set; }
    }
}
