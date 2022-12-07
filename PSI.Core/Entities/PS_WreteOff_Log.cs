using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class PS_WreteOff_Record : Entity
    {
        public Guid PURCHASE_WEIGHTNOTE_UNID { get; set; }
        public string PURCHASE_DOC_NO { get; set; }
        public Guid SALES_WEIGHTNOTE_UNID { get; set; }
        public string SALES_DOC_NO { get; set; }
        public Guid PRODUCT_UNID { get; set; }
        public string PRODUCT_NAME { get; set; }
        public decimal WRITEOFF_WEIGHT { get; set; }
        public decimal PRODUCT_PERCENT { get; set; }
        public decimal PERCENT { get; set; }
        public decimal LIVEIN_UNIT_PRICE { get; set; }  // 當下品項成本單價
        public decimal REAL_UNIT_PRICE { get; set; }  // 客戶付款品像單價

    }
}
