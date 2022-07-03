using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class SalesWeightNote : Entity
    {
        public Guid UNID { get; set; } // 出貨磅單的UNID
        public string DOC_NO { get; set; }
        public Guid CUSTOMER_UNID { get; set; }
        public Guid CARNO_UNID { get; set; }
        public DateTime? LEAVE_WEIGHT_TIME { get; set; } // 預估收款時間
        public int? SCALE_NO { get; set; }

        public Guid EXCAVATOR_OPERATOR_UNID { get; set; }  // 怪手司機UNID
        public Guid? CONTRACT_UNID { get; set; }
        public int NOTE_STATUS { get; set; }  // 磅單狀態
        public decimal ACTUAL_UNIT_PRICE { get; set; }  // 實際單價       
        public decimal? TRAFIC_UNIT_PRICE { get; set; }  // 運費單價
        public string REMARK { get; set; }
        public Guid ESTIMATE_PRODUCT_ITEM_UNID { get; set; }   // 預估磅單認列品項
        public Guid ACTUAL_PRODUCT_ITEM_UNID { get; set; }   // 實際磅單認列品項
        public double ESTIMATE_SALES_WEIGHT { get; set; }  // 預估出貨重量
        public double ACTUAL_SALES_WEIGHT { get; set; }  // 實際出貨重量
        public double ESTIMATE_DEFECTIVE_WEIGHT { get; set; } // 預估扣重
        public double ACTUAL_DEFECTIVE_WEIGHT { get; set; } // 實際扣重      
        public decimal ESTIMATE_UNIT_PRICE { get; set; }  // 預估單價      
        public int ESTIMATE_RECEIVED_TYPE { get; set; }  // 預估收款方式
        public int ACTUAL_RECEIVED_TYPE { get; set; }  // 實際收款方式
        public DateTime? ESTIMATE_RECEIVED_TIME { get; set; } // 預估收款時間
        public DateTime? ACTUAL_RECEIVED_TIME { get; set; } // 實際收款時間

    }
}
