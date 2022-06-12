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
        public Guid INSIDE_PRODUCT_ITEM_UNID { get; set; }   // 廠內磅單認列品項
        public Guid OUTSIDE_PRODUCT_ITEM_UNID { get; set; }   // 客戶磅單認列品項
        public double INSIDE_SALES_WEIGHT { get; set; }  // 廠內出貨重量
        public double INSIDE_DEFECTIVE_WEIGHT { get; set; } // 廠內扣重
        public double INSIDE_ACTUAL_WEIGHT { get; set; }  // 廠內計價重量
        public double OUTSIDE_SALES_WEIGHT { get; set; }  // 客戶出貨重量
        public double OUTSIDE_DEFECTIVE_WEIGHT { get; set; } // 客戶扣重
        public double OUTSIDE_ACTUAL_WEIGHT { get; set; }  // 客戶計價重量
        public decimal INSIDE_UNIT_PRICE { get; set; }  // 廠內單價
        public decimal OUTSIDE_UNIT_PRICE { get; set; }  // 客戶單價
        public decimal? INSIDE_INVOICE_PRICE { get; set; }  // 廠內預估請款金額
        public decimal? RECEIVED_PRICE { get; set; }  // 實收金額 ( 客戶實際請款金額)
        public decimal? TRAFIC_UNIT_PRICE { get; set; }  // 運費單價
        public decimal? INSIDE_TRAFIC_FEE { get; set; }  // 廠內預估運費
        public decimal? ACTUAL_TRAFIC_FEE { get; set; }  // 實際運費
        public int RECEIVED_TYPE { get; set; }
        public DateTime? RECEIVED_TIME { get; set; }
        public Guid? CONTRACT_UNID { get; set; }
        public int NOTE_STATUS { get; set; }  // 磅單狀態
        public string REMARK { get; set; }


    }
}
