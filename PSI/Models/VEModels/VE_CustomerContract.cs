using System;

namespace PSI.Models.VEModels
{
    public class VE_CustomerContract
    {
        public Guid ContractGUID { get; set; }
        public string ContractName { get; set; }  // 合約名稱
        public Guid CustomerGUID { get; set; }
        public Guid ProductGUID { get; set; }         // 合約認列品項
        public string ContractType { get; set; }
        public DateTime StartDatetime { get; set; }
        public DateTime EndDatetime { get; set; }
        public string ExpireReason { get; set; }
        public double DealWeight { get; set; }
        public double DealUnitPrice { get; set; }
        public double ActualWeight { get; set; }
        public string IsEffective { get; set; }
        public string Remark { get; set; }

    }
}
