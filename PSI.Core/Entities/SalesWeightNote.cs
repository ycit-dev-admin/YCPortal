using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class SalesWeightNote : Entity
    {
        public Guid UNID { get; set; } // 出貨磅單的UNID
        public string DOC_NO { get; set; }   // 出貨磅單單號
        public Guid CUSTOMER_UNID { get; set; }
        public Guid CARNO_UNID { get; set; }
        public DateTime SALES_TIME { get; set; } // 廠內出貨時間
        public DateTime? UPDATE_SALES_TIME { get; set; } // 客戶收貨回填時間
        public int? SCALE_NO { get; set; }
        public Guid EXCAVATOR_OPERATOR_UNID { get; set; }  // 怪手司機UNID
        public Guid? CONTRACT_UNID { get; set; }  // 對應合約
        public int NOTE_STATUS { get; set; }  // 磅單狀態   1:廠內出貨 2: 客戶資訊回填 3: 完成  90:單據異常
        public decimal? TAX_RENT { get; set; }  // 當下稅率
        public decimal? INVOICE_PRICE { get; set; }  // 請款金額 
        public decimal? INVOICEPRICE_TAX { get; set; } // 請款金額稅額
        public decimal? TRAFIC_UNIT_PRICE { get; set; }  // 運費當下單價
        public decimal? TRAFIC_FEE { get; set; }  // 運費
        public decimal? TRAFIC_FEE_TAX { get; set; }  // 運費稅額
        public decimal? RECEIVED_PRICE { get; set; }  // 實收總金額
        public Guid PRODUCT_ITEM_UNID { get; set; }   // 主要認列出貨品項 (還不確定用途)
        public decimal SALES_WEIGHT { get; set; }  // 出貨總重量
        public decimal? DEFECTIVE_WEIGHT { get; set; } // 出貨總扣重
        public decimal SALES_UNIT_PRICE { get; set; } // 成本平均單價
        public decimal? RECEIVED_UNIT_PRICE { get; set; } // 客戶付款平均單價
        public int? RECEIVED_TYPE { get; set; }  // 收款方式
        public DateTime? RECEIVED_TIME { get; set; } // 收款時間
        public string REMARK { get; set; }  // 磅單備註

        // 下列預計廢除
        //public Guid PRODUCT_ITEM_UNID { get; set; }   // 出貨認列品項

        //public decimal ACTUAL_UNIT_PRICE { get; set; }  // 實際單價       
        //public decimal? TRAFIC_UNIT_PRICE { get; set; }  // 運費單價
        //public Guid ESTIMATE_PRODUCT_ITEM_UNID { get; set; }   // 預估磅單認列品項  (皆不用可移除，因為出貨的品項應該由公司內部認定)
        //public Guid ACTUAL_PRODUCT_ITEM_UNID { get; set; }   // 實際磅單認列品項 (皆不用可移除，因為出貨的品項應該由公司內部認定)



        //public double ESTIMATE_SALES_WEIGHT { get; set; }  // 預估出貨重量
        //public double ACTUAL_SALES_WEIGHT { get; set; }  // 實際出貨重量
        //public double ESTIMATE_DEFECTIVE_WEIGHT { get; set; } // 預估扣重
        //public double ACTUAL_DEFECTIVE_WEIGHT { get; set; } // 實際扣重      
        //public decimal ESTIMATE_UNIT_PRICE { get; set; }  // 預估單價      
        //public int ESTIMATE_RECEIVED_TYPE { get; set; }  // 預估收款方式
        //public int ACTUAL_RECEIVED_TYPE { get; set; }  // 實際收款方式
        //public DateTime? ESTIMATE_RECEIVED_TIME { get; set; } // 預估收款時間
        //public DateTime? ACTUAL_RECEIVED_TIME { get; set; } // 實際收款時間

    }
}
