using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class WeightNote : Entity
    {
        public string CarNo { get; set; }
        public float FullWeight { get; set; }
        public DateTime FullWeightTime { get; set; }
        public string ScaleNo { get; set; }
        public string InputType { get; set; }
        public string FacNo { get; set; }
        public string Ingredient { get; set; }
        public float DefectiveWeight { get; set; }
        public string DefectiveReason { get; set; }
        public DateTime ExcavatorOpTime { get; set; }
        public string ExcavatorOpEmpNo { get; set; }
        public float CarWeight { get; set; }
        public DateTime CarWeightTime { get; set; }
        public float TradeWeight { get; set; }
        public float FinalDefectiveWeight { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal ActualPrice { get; set; }
        public string PayType { get; set; }
        public string CustomerId { get; set; }
        public string NoteStatus { get; set; }
        public string Remark { get; set; }
        public string CreatorEmpNo { get; set; }
        public DateTime CreateTime { get; set; }
        public string UpdateEmpNo { get; set; }
        public DateTime UpdateTime { get; set; }
        public DateTime EffectiveTime { get; set; }
    }
}
