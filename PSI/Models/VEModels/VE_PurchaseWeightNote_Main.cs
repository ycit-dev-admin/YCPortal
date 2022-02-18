using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;

namespace PSI.Models.VEModels
{
    public abstract class VE_PurchaseWeightNote_Main
    {
        public virtual string DocNo { get => ""; set => DocNo = ""; }
        protected string CarNo { get; set; }
        protected double FullWeight { get; set; }
        protected DateTime FullWeightTime { get; set; }
        protected string ScaleNo { get; set; }
        protected string InputType { get; set; }
        protected string FacNo { get; set; }
        // protected string Ingredient { get; set; } // 不要惹
        protected double DefectiveWeight { get; set; }
        protected string DefectiveReason { get; set; }
        protected DateTime? ExcavatorOpTime { get; set; }
        protected string ExcavatorOpEmpNo { get; set; }
        protected double? CarWeight { get; set; }
        protected DateTime? CarWeightTime { get; set; }
        protected double? TradeWeight { get; set; }
        protected double? FinalDefectiveWeight { get; set; }
        protected decimal UnitPrice { get; set; }  // 單價
        protected decimal? TraficUnitPrice { get; set; }  // 運費單價
        protected decimal? WeightPrice { get; set; }   // 計價金額
        protected decimal DeliveryFee { get; set; }  // 運費
        protected decimal ThirdWeightFee { get; set; }  // 借第三方磅費
        protected decimal? ActualPrice { get; set; }  // 實付金額

        protected bool HasTax { get; set; }
        // protected string SettleType { get; set; }      
        protected string PayType { get; set; }
        protected DateTime? PayTime { get; set; }

        protected long CustomerId { get; set; }
        protected string CustomerName { get; set; }  // 當下客戶名
        protected string NoteStatus { get; set; }
        protected string Remark { get; set; }
        protected DateTime EffectiveTime { get; set; }



    }

}
