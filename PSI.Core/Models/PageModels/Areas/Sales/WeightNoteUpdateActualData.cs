using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Core.Models.DTOModels;


namespace PSI.Core.Models.PageModels.Areas.Sales
{
    public class WeightNoteUpdateActualData
    {
        /* For Post */
        public Guid CustomerUNID { get; set; }
        public Guid ExcavatorOperUNID { get; set; }

        public Guid? ContractUNID { get; set; }
        public Guid ProductItemUNID { get; set; }   // 廠內磅單主要認列品項
        //public List<PE_SalesIngredient> PESalesIngredientList { get; set; }
        public double? ActualLeaveWeight { get; set; }  // 出貨重量
        public double? ActualDefectiveWeight { get; set; }
        public decimal? ActualUnitPrice { get; set; }
        public decimal ActualTraficUnitPrice { get; set; }  // 運費單價
        public bool ActualInvoicePriceHasTax { get; set; } // 請款金額是否含稅
        public bool ActualTraficHasTax { get; set; } // 運費是否含稅
        public int? ScaleNo { get; set; }
        public int ReceivedType { get; set; }
        public DateTime? ReceivedTime { get; set; }
        public string Remark { get; set; }



        /* For Page */

        // 原則1 可以從DTO取的就從DTO取
        // 原則2 若是從DTO取出的資料需要經過加工 (ex Helper處理 則於Controller處理完後再丟給PageModel宣告成員去接)
        // 原則3 SelectListItem先一律從controller那邊給 還是讓pagemodel 相依 SelectListItem (似乎找到解法)
        // 原則4 上述原則一律是For Page顯示的概念，若為 For Post的 PageModel成員 一律要於Page Model個別宣告

        public DTO_SalesWeightNote DTOSalesWeightNote { get; set; }


        public List<SelectListItem> ReceivedTypItems { get; set; }

        public DTO_SalesWeightNoteStepData EastimateResultPrice { get; set; }
        public DTO_SalesWeightNoteStepData ActualResultPrice { get; set; }
        public List<DTO_S_WeightNote_Ingredient> SalesIngredients { get; set; }

        ////
        //public List<DTO_CustomerCar> DTOCustomerCarItems { get; set; }
        //public List<DTO_CodeTable> DTOReceivedTypItems { get; set; }
        //public List<DTO_CustomerContract> DTOCustomerContractItems { get; set; }
        ////

        //public List<SelectListItem> CarNoItems { get; set; }
        //public List<SelectListItem> ProductItemItems { get; set; }






        // Post
        //public string SelectPurchaseDetailInfos { get; set; }

    }
}
