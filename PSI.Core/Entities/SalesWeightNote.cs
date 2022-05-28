using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class SalesWeightNote : Entity
    {
        public Guid UNID { get; set; }
        public string DOC_NO { get; set; }
        public Guid CUSTOMER_UNID { get; set; }
        public Guid PRODUCT_ITEM_UNID { get; set; }   // 磅單認列品項
        public double LEAVE_WEIGHT { get; set; }  // 出貨重量
        public double DEFECTIVE_WEIGHT { get; set; }
        public double ACTUAL_WEIGHT { get; set; }
        public decimal UNIT_PRICE { get; set; }  // 單價
        public decimal? INVOICE_PRICE { get; set; }  // 請款金額
        public decimal? TRAFIC_UNIT_PRICE { get; set; }  // 運費單價
        public decimal? TRAFIC_FEE { get; set; }  // 運費
        public decimal? RECEIVED_PRICE { get; set; }  // 實收金額
        public string RECEIVED_TYPE { get; set; }
        public DateTime? RECEIVED_TIME { get; set; }
        public Guid? CONTRACT_UNID { get; set; }
        public int NOTE_STATUS { get; set; }  // 磅單狀態
        public string REMARK { get; set; }


    }
}
