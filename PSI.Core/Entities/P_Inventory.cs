using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class P_Inventory : Entity
    {
        public Guid PURCHASE_WEIGHTNOTE_UNID { get; set; }
        public string PURCHASE_DOC_NO { get; set; }
        public Guid PRODUCT_UNID { get; set; }
        public string PRODUCT_ITEM_NAME { get; set; }
        public decimal PURCHASE_WEIGHT { get; set; }
        public decimal REMAINING_WEIGHT { get; set; }
        public int ITEM_PERCENT { get; set; }
        public decimal UNIT_PRICE { get; set; }  // 進貨單價
        public int STATUS { get; set; }   // 1:在庫存  0:已出貨
    }
}
