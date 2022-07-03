using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class SalesWeightNoteResultPrice : Entity
    {
        public Guid DOC_UNID { get; set; } // 出貨磅單的UNID
        public string DOC_NO { get; set; } // 出貨磅單單號
        public int DATA_STEP { get; set; } // 資料階段   1:廠內預估 2:資料回填
        public decimal INVOICE_PRICE { get; set; }  // 請款金額 
        public bool INVOICEPRICE_HASTAX { get; set; } // 請金額是否含稅
        public decimal TRAFIC_FEE { get; set; }  // 運費
        public bool TRAFICFEE_HASTAX { get; set; } // 運費是否含稅
        public decimal RECEIVED_PRICE { get; set; }  // 實收金額

    }
}
