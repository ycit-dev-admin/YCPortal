using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;

namespace PSI.Models.VEModels
{
    public class VE_PurchaseWeightNote
    {
        // Post

        // Entities
        public long Id { get; set; }
        public string DocNo { get; set; }
        public string CarNo { get; set; }
        public double FullWeight { get; set; }
        public DateTime FullWeightTime { get; set; }
        public double DefectiveWeight { get; set; }
        public string UnitPrice { get; set; }
        public bool HasTax { get; set; }
        public decimal ActualPrice { get; set; }
        public string ThirdWeightFee { get; set; }  // 磅費
        public string PayType { get; set; }
        public DateTime? PayTime { get; set; }
        public string CreateEmpNo { get; set; }
        public DateTime? CreateTime { get; set; }


        //-----------------------------------
        public double TradeWeight { get; set; }

        public string Remark { get; set; }
        public DateTime EffectiveTime { get; set; }
        //



        public string ScaleNo { get; set; }
        public string ExcavatorOpEmpNo { get; set; }
        public long? CustomerId { get; set; }
        public string CustomerName { get; set; }  // 當下客戶名     
        //public string SelectPurchaseDetailInfos { get; set; }

        public string TraficUnitPrice { get; set; }


        public string ContractFrom { get; set; }
        public string CarNoId { get; set; }



    }

}
