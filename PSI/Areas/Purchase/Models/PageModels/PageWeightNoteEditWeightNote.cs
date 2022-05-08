using System;

namespace PSI.Areas.Purchase.Models.PageModels
{
    public class PageWeightNoteEditWeightNote
    {
        /* Page */
        #region --- VE_Properties ---
        public string SelectPurchaseDetailInfos { get; set; }
        #endregion

        #region --- EV_Properties ---
        public string DocNo { get; set; }
        public DateTime FullWeightTime { get; set; }
        public string CustomerName { get; set; }// 當下客戶名     
        public string CarNo { get; set; }
        public double FullWeight { get; set; }
        public double DefectiveWeight { get; set; }
        public string UnitPrice { get; set; }
        public bool HasTax { get; set; }
        public string ScaleNo { get; set; }  // 磅秤編號 (1:大磅 2:小磅)
        public decimal TraficUnitPrice { get; set; }   // 運費單價
        public decimal ThirdWeightFee { get; set; }  // 第三方磅費
        public decimal WeightPrice { get; set; }   // 計價金額
        public decimal DeliveryFee { get; set; }  // 運費
        public decimal ActualPrice { get; set; }
        public DateTime PayTime { get; set; }
        public string Remark { get; set; }
        #endregion

        #region --- Page Only ---
        public string PayTypeName { get; set; }
        public string MainIngredientInfo { get; set; }
        public string[] IngredientInfos { get; set; }
        #endregion 



        /* VE_Models */
        // public VE_PurchaseWeightNote_Query VEPurchaseWeightNoteQuery { get; set; }

        // Post


        // Entities
        // public VE_PurchaseWeightNote VE_PurchaseWeightNote { get; set; }

        //public List<VE_PurchaseIngredient> VE_PurchaseIngredientLs { get; set; }

        //public List<PurchaseDetailInfo> PurchaseDetailInfos { get; set; }



        // 下列應該要移除

        //public List<SelectListItem> CustomerInfoItems { set; get; }
        //public List<SelectListItem> PayTypeItems { set; get; }
        //public List<SelectListItem> ProductItemItems { set; get; }



    }



}
