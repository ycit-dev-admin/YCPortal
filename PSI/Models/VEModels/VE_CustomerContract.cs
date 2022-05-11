using System;

namespace PSI.Models.VEModels
{
    public class VE_CustomerContract
    {
        public string ContractGUID { get; set; }
        public string ContractName { get; set; }  // 合約名稱
        public string CustomerGUID { get; set; }
        public string ProductGUID { get; set; }         // 合約認列品項
        public string ContractType { get; set; }
        public DateTime StartDatetime { get; set; }
        public DateTime EndDatetime { get; set; }
        public string ExpireReason { get; set; }
        public double DealWeight { get; set; }
        public double DealUnitPrice { get; set; }
        public double ActualWeight { get; set; }
        public string IsEffective { get; set; }
        public string Remark { get; set; }

        // Only VE Model
        public long? NowActualWeight { get; set; }  // 已完成金額  For API
        public decimal? NowActualPrice { get; set; }  // 已完成金額  For API


    }
}
