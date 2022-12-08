using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class SalesIngredient : Entity
    {
        /* 進貨組成表  */
        public Guid SALES_WEIGHTNOTE_UNID { get; set; }
        public Guid PRODUCT_UNID { get; set; }
        public string ITEM_NAME { get; set; }
        //public string Title { get; set; }
        public decimal ITEM_PERCENT { get; set; }
        public decimal LIVEIN_UNIT_PRICE { get; set; }  // 當下廠內出貨成本單價  (狀態1)  (去撈對應的庫存單算出平均金額)
        public decimal REAL_UNIT_PRICE { get; set; }  // 客戶付款品項單價 (狀態2)
    }
}
