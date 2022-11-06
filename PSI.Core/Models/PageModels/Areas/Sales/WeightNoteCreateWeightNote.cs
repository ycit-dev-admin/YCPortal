using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Core.Models.DTOModels;

namespace PSI.Core.Models.PageModels.Areas.Sales
{
    public class WeightNoteCreateWeightNote
    {
        /* For Post */
        public Guid CustomerUNID { get; set; }
        public Guid CarNoUNID { get; set; }
        public Guid ExcavatorOperUNID { get; set; }
        public DateTime? LeaveWeightTime { get; set; }
        public Guid? ContractUNID { get; set; }
        public Guid ProductItemUNID { get; set; }   // 廠內磅單主要認列品項
        public List<DTO_SalesIngredient> DTOSalesIngredients { get; set; }
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
        public List<SelectListItem> CustomerInfoItems { set; get; }
        public List<SelectListItem> CarNoItems { set; get; }
        public List<SelectListItem> ReceivedTypeItems { set; get; }
        public List<SelectListItem> ProductItemItems { set; get; }
        public List<SelectListItem> CustomerContractItems { set; get; }




        // Post
        //public string SelectPurchaseDetailInfos { get; set; }

    }
}
