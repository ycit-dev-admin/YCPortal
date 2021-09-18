using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;

namespace PSI.VM_Models.PurchaseWeightNote
{
    public class VM_PurchaseWeightNote
    {
        // Entity
        public double TradeWeight { get; set; }
        public decimal ActualPrice { get; set; }
        public string PayType { get; set; }
        public string CreateEmpNo { get; set; }
        public string Remark { get; set; }
        public DateTime EffectiveTime { get; set; }
        //
        public string FullWeight { get; set; }
        public string DefectiveWeight { get; set; }
        public DateTime? FullWeightTime { get; set; }
        public string ScaleNo { get; set; }
        public string ExcavatorOpEmpNo { get; set; }
        public long? CustomerId { get; set; }
        public string CustomerName { get; set; }  // 當下客戶名     
        public string SelectPurchaseDetailInfos { get; set; }
        public string UnitPrice { get; set; }
        public string TraficUnitPrice { get; set; }
        public string WeightFee { get; set; }
        public string IsHasText { get; set; }
        public string ContractFrom { get; set; }
        public string CarNoId { get; set; }
        public string CarNoName { get; set; }
        //public List<PurchaseDetailInfo> PurchaseDetailInfos { get; set; }

        // Page Field
        public List<SelectListItem> CustomerInfoItems { set; get; }
        public List<SelectListItem> ProductItemItems { set; get; }

    }

    public class PurchaseDetailInfo
    {
        public string Value { get; set; }
        public string Name { get; set; }
        public int? Percent { get; set; }
    }
}
