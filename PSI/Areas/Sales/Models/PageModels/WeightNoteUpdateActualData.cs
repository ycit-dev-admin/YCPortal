using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Models.PEModels;

namespace PSI.Areas.Sales.Models.PageModels
{
    public class WeightNoteUpdateActualData
    {
        /* For Post */
        public Guid CustomerUNID { get; set; }
        public Guid CarNoUNID { get; set; }
        public Guid ExcavatorOperUNID { get; set; }
     
        public Guid? ContractUNID { get; set; }
        public Guid ProductItemUNID { get; set; }   // 廠內磅單主要認列品項
        public List<PE_SalesIngredient> PESalesIngredientList { get; set; }
        public double? LeaveWeight { get; set; }  // 出貨重量
        public double? DefectiveWeight { get; set; }
        public decimal? UnitPrice { get; set; }
        public decimal TraficUnitPrice { get; set; }  // 運費單價
        public bool InvoicePriceHasTax { get; set; }
        public bool TraficFeeHasTax { get; set; }
        public int? ScaleNo { get; set; }
        public int ReceivedType { get; set; }
        public DateTime? ReceivedTime { get; set; }
        public string Remark { get; set; }



        /* For Page */
        public string CustomerName { get; set; }
        public string CarNo { get; set; }
        public DateTime LeaveWeightTime { get; set; }
        public PE_SalesWeightNote PESalesWeightNote { get; set; }
        public List<SelectListItem> CustomerInfoItems { get; set; }
        public List<SelectListItem> CarNoItems { get; set; }
        public List<SelectListItem> ReceivedTypeItems { get; set; }
        public List<SelectListItem> ProductItemItems { get; set; }
        public List<SelectListItem> CustomerContractItems { get; set; }




        // Post
        //public string SelectPurchaseDetailInfos { get; set; }

    }
}
