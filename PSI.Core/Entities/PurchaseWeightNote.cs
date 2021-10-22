using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class PurchaseWeightNote : Entity
    {
        public string CarNo { get; set; }
        public double FullWeight { get; set; }
        public DateTime FullWeightTime { get; set; }
        public string ScaleNo { get; set; }
        public string InputType { get; set; }
        public string FacNo { get; set; }
        public string Ingredient { get; set; }
        public double DefectiveWeight { get; set; }
        public string DefectiveReason { get; set; }
        public DateTime? ExcavatorOpTime { get; set; }
        public string ExcavatorOpEmpNo { get; set; }
        public double? CarWeight { get; set; }
        public DateTime? CarWeightTime { get; set; }
        public double? TradeWeight { get; set; }
        public double? FinalDefectiveWeight { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal? WantPrice { get; set; }
        public decimal ActualPrice { get; set; }
        public bool HasTax { get; set; }
        public decimal ThirdWeightFee { get; set; }  // 借第三方磅費
        public string SettleType { get; set; }

        public decimal? TraficFee { get; set; }   // 派車去指定地方載的運費
        public string PayType { get; set; }
        public long CustomerId { get; set; }
        public string CustomerName { get; set; }  // 當下客戶名
        public string NoteStatus { get; set; }
        public string Remark { get; set; }
        public DateTime EffectiveTime { get; set; }
    }
}
