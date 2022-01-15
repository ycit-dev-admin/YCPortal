using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class PurchaseWeightNote : Entity
    {
        public string DocNo { get; set; }
        public string CarNo { get; set; }
        public double FullWeight { get; set; }
        public DateTime FullWeightTime { get; set; }
        public string ScaleNo { get; set; }
        public string InputType { get; set; }
        public string FacNo { get; set; }
        // public string Ingredient { get; set; } // 不要惹
        public double DefectiveWeight { get; set; }
        public string DefectiveReason { get; set; }
        public DateTime? ExcavatorOpTime { get; set; }
        public string ExcavatorOpEmpNo { get; set; }
        public double? CarWeight { get; set; }
        public DateTime? CarWeightTime { get; set; }
        public double? TradeWeight { get; set; }
        public double? FinalDefectiveWeight { get; set; }
        public decimal UnitPrice { get; set; }  // 單價
        public decimal? TraficUnitPrice { get; set; }  // 運費單價
        public decimal? WeightPrice { get; set; }   // 計價金額
        public decimal DeliveryFee { get; set; }  // 運費
        public decimal ThirdWeightFee { get; set; }  // 借第三方磅費
        public decimal? ActualPrice { get; set; }  // 實付金額

        public bool HasTax { get; set; }
        // public string SettleType { get; set; }      
        public string PayType { get; set; }
        public DateTime? PayTime { get; set; }

        public long CustomerId { get; set; }
        public string CustomerName { get; set; }  // 當下客戶名
        public string NoteStatus { get; set; }
        public string Remark { get; set; }
        public DateTime EffectiveTime { get; set; }
    }
}
