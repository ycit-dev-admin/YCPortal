using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class PurchaseWeightNote : Entity
    {
        public Guid UNID { get; set; }
        public string DOC_NO { get; set; }
        public string CAR_NO { get; set; }
        public double FULL_WEIGHT { get; set; }
        public DateTime FULL_WEIGHT_TIME { get; set; }
        public string SCALE_NO { get; set; }
        public string INPUT_TYPE { get; set; }
        public string FAC_NO { get; set; }
        public double DEFECTIVE_WEIGHT { get; set; }
        public string DEFECTIVE_REASON { get; set; }
        public DateTime? EXCAVATOR_OPERATE_TIME { get; set; }
        public string EXCAVATOR_OPERATE_EMPLOYEENO { get; set; }
        public double? CAR_WEIGHT { get; set; }
        public DateTime? CAR_WEIGHT_TIME { get; set; }
        public double? TRADE_WEIGHT { get; set; }
        public double? FINALE_DDEFECTIVE_WEIGHT { get; set; }
        public decimal UNIT_PRICE { get; set; }  // 單價
        public decimal? TRAFIC_UNIT_PRICE { get; set; }  // 運費單價
        public decimal? WEIGHT_PRICE { get; set; }   // 計價金額
        public decimal DELIVERY_FEE { get; set; }  // 運費
        public decimal THIRD_WEIGHT_FEE { get; set; }  // 借第三方磅費
        public decimal? ACTUAL_PRICE { get; set; }  // 實付金額

        public bool HAS_TAX { get; set; }
        // public string SettleType { get; set; }      
        public string PAY_TYPE { get; set; }
        public DateTime? PAY_TIME { get; set; }
        public Guid CUSTOMER_UNID { get; set; }
        public string CUSTOMER_NAME { get; set; }  // 當下客戶名
        public string NOTE_STATUS { get; set; }
        public string REMARK { get; set; }
        public DateTime EFFECTIVE_TIME { get; set; }
    }
}
