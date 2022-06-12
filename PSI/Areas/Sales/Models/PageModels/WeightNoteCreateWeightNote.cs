using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Models.VEModels;

namespace PSI.Areas.Sales.Models.PageModels
{
    public class WeightNoteCreateWeightNote
    {
        /* For Post */
        public Guid CustomerUNID { get; set; }
        public Guid InsideProductItemUNID { get; set; }   // 廠內磅單認列品項
        public double Inside_SALES_WEIGHT { get; set; }  // 廠內出貨重量
        public double InsideDefectiveWeight { get; set; } // 廠內扣重
        public double InsideActualWeight { get; set; }  // 廠內計價重量
        public decimal InsideUnitPrice { get; set; }  // 廠內單價
        public decimal? InsideInvoicePrice { get; set; }  // 廠內預估請款金額
        public decimal? TraficUnitPrice { get; set; }  // 運費單價
        public decimal? InsideTraficFee { get; set; }  // 廠內預估運費
        public Guid? ContractUNID { get; set; }
        public string Remark { get; set; }


        /* For Page */
        public double LeaveWeight { get; set; }  // 出貨重量
        public double? DefectiveWeight { get; set; }
        public decimal UnitPrice { get; set; }
        public List<SelectListItem> CustomerInfoItems { set; get; }
        public List<SelectListItem> CarNoItems { set; get; }
        public List<SelectListItem> PayTypeItems { set; get; }
        public List<SelectListItem> ProductItemItems { set; get; }
        public List<SelectListItem> CustomerContractItems { set; get; }

        // new pattern
        public DateTime? FullWeightTime { get; set; }

        public string CustomerName { get; set; }  // 當下客戶名     
        public string CarNoUNID { get; set; }
        public string ContractUNID { get; set; }  // 進貨合約
        public string CarNo { get; set; }  // 當下車牌


        public bool HasTax { get; set; }
        public string ScaleNo { get; set; }        
        public decimal TraficUnitPrice { get; set; }  // 運費單價
        public decimal ThirdWeightFee { get; set; }  // 磅費
        public string PayType { get; set; }
        public DateTime? PayTime { get; set; }
        public string Remark { get; set; }





        // Post
        public string SelectPurchaseDetailInfos { get; set; }

        // Entities
        // public VE_PurchaseWeightNote VE_PurchaseWeightNote { get; set; }

        public List<VE_PurchaseIngredient> VE_PurchaseIngredientLs { get; set; }

        //public List<PurchaseDetailInfo> PurchaseDetailInfos { get; set; }



    }

    //public class VE_PurchaseIngredient
    //{
    //    public string Value { get; set; }
    //    public string Name { get; set; }
    //    public int? Percent { get; set; }
    //}
}
