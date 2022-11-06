using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class SalesWeightNoteStepData : Entity
    {
        public Guid DOC_UNID { get; set; } // 出貨磅單的UNID
        public string DOC_NO { get; set; } // 出貨磅單單號
        public int DATA_STEP { get; set; } // 資料階段   1:廠內預估 2:資料回填
        public decimal INVOICE_PRICE { get; set; }  // 請款金額 
        public bool INVOICEPRICE_HASTAX { get; set; } // 請款金額是否含稅
        public decimal TRAFIC_FEE { get; set; }  // 運費
        public bool TRAFICFEE_HASTAX { get; set; } // 運費是否含稅
        public decimal RECEIVED_PRICE { get; set; }  // 實收金額



        //////////////////////////////////////////////////////////////
        public decimal UNIT_PRICE { get; set; }  // 品項單價       
        public decimal? TRAFIC_UNIT_PRICE { get; set; }  // 運費單價
        public Guid PRODUCT_ITEM_UNID { get; set; }   // 磅單認列品項 (若要記帳要以廠內預估階段來認定)
        public double SALES_WEIGHT { get; set; }  // 出貨重量
        public double DEFECTIVE_WEIGHT { get; set; } // 扣重
        public int RECEIVED_TYPE { get; set; }  // 收款方式
        public DateTime RECEIVED_TIME { get; set; } // 收款時間




    }
}
