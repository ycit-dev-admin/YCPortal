using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class PS_WriteOff_Log : Entity
    {
        public Guid PURCHASE_WEIGHTNOTE_UNID { get; set; }   // (狀態1)
        public string PURCHASE_DOC_NO { get; set; }    // (狀態1)
        public Guid SALES_WEIGHTNOTE_UNID { get; set; }    // (狀態1)
        public string SALES_DOC_NO { get; set; }    // (狀態1)
        public Guid PRODUCT_UNID { get; set; }    // (狀態1)
        public string PRODUCT_NAME { get; set; }    // (狀態1)
        public decimal WRITEOFF_WEIGHT { get; set; }    // (狀態1)
        public decimal PERCENT { get; set; }    // (狀態1)
        public int WRITEOFF_STATUS { get; set; }
        //public decimal LIVEIN_UNIT_PRICE { get; set; }  // 當下品項成本單價
        //public decimal REAL_UNIT_PRICE { get; set; }  // 客戶付款品像單價 (狀態2)

    }
}
