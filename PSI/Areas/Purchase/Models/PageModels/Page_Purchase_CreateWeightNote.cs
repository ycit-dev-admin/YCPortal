using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Models.VEModels;

namespace PSI.Areas.Purchase.Models.PageModels
{
    public class Page_Purchase_CreateWeightNote
    {
        // new pattern
        public DateTime? FullWeightTime { get; set; }
        public Guid CustomerUNID { get; set; }
        public string CustomerName { get; set; }  // 當下客戶名     
        public Guid CanNoUNID { get; set; }
        public string CarNo { get; set; }  // 當下車牌
        public double? FullWeight { get; set; }
        public double? DefectiveWeight { get; set; }
        public double? UnitPrice { get; set; }
        public bool HasTax { get; set; }
        public string ScaleNo { get; set; }
        public double TraficUnitPrice { get; set; }  // 運費單價
        public decimal ThirdWeightFee { get; set; }  // 磅費
        public string PayType { get; set; }
        public DateTime? PayTime { get; set; }
        public string Remark { get; set; }





        // Post
        public string SelectPurchaseDetailInfos { get; set; }

        // Entities
        public VE_PurchaseWeightNote VE_PurchaseWeightNote { get; set; }

        public List<VE_PurchaseIngredient_Query> VE_PurchaseIngredientLs { get; set; }

        //public List<PurchaseDetailInfo> PurchaseDetailInfos { get; set; }

        // Page
        public List<SelectListItem> CustomerInfoItems { set; get; }
        public List<SelectListItem> PayTypeItems { set; get; }
        public List<SelectListItem> ProductItemItems { set; get; }

    }

    //public class VE_PurchaseIngredient
    //{
    //    public string Value { get; set; }
    //    public string Name { get; set; }
    //    public int? Percent { get; set; }
    //}
}
