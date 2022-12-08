using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class S_WeightNote : Entity
    {
        public Guid UNID { get; set; } // 出貨磅單的UNID  (狀態1)
        public string DOC_NO { get; set; }   // 出貨磅單單號 (狀態1)
        public Guid CUSTOMER_UNID { get; set; }  // 出貨客戶 (狀態1)
        public Guid CARNO_UNID { get; set; }  // 出貨車輛 (狀態1)
        public DateTime SALES_TIME { get; set; } // 廠內出貨時間 (狀態1)
        public DateTime? UPDATE_SALES_TIME { get; set; } // 客戶收貨回填時間  (狀態2)
        public int? SCALE_NO { get; set; }   // 磅單號碼  (狀態1)
        public Guid EXCAVATOR_OPERATOR_UNID { get; set; }  // 怪手司機UNID  (狀態1)
        public Guid? CONTRACT_UNID { get; set; }  // 對應合約  (狀態2)
        public int NOTE_STATUS { get; set; }  // 磅單狀態   1:廠內出貨 2: 客戶資訊回填 3: 完成  90:單據異常   (所有狀態)
        public decimal? TAX_RENT { get; set; }  // 當下稅率  (狀態2)
        public decimal? INVOICE_PRICE { get; set; }  // 請款金額  (狀態2)
        public decimal? INVOICEPRICE_TAX { get; set; } // 請款金額稅額 (狀態2)
        public decimal? TRAFIC_UNIT_PRICE { get; set; }  // 運費單價 (狀態2)
        public decimal? TRAFIC_FEE { get; set; }  // 運費  (狀態2)
        public decimal? TRAFIC_FEE_TAX { get; set; }  // 運費稅額   (狀態2)
        public decimal? RECEIVED_PRICE { get; set; }  // 實收總金額   (狀態2)
        public Guid PRODUCT_ITEM_UNID { get; set; }   // 主要認列出貨品項 (還不確定用途)   (狀態1)
        public decimal INSIDE_SALES_WEIGHT { get; set; }  // 廠內出貨總秤重   (狀態1)
        public decimal? CUSTOMER_SALES_WEIGHT { get; set; }  // 客戶收貨總秤重   (狀態2)
        public decimal? DEFECTIVE_WEIGHT { get; set; } // 客戶出貨總扣重  (狀態2)
        public decimal SALES_UNIT_PRICE { get; set; } // 成本平均單價 (狀態1)
        public decimal? RECEIVED_UNIT_PRICE { get; set; } // 客戶付款平均單價  (狀態2)
        public int? RECEIVED_TYPE { get; set; }  // 收款方式   (狀態2)
        public DateTime? RECEIVED_TIME { get; set; } // 收款時間   (狀態2)
        public string REMARK { get; set; }  // 磅單備註   (狀態1.2)

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
