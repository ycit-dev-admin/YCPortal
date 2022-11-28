using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class PurchaseIngredient : Entity
    {
        public Guid PURCHASE_WEIGHTNOTE_UNID { get; set; }
        public Guid PRODUCT_UNID { get; set; }
        public string ITEM_NAME { get; set; }
        public double PURCHASE_WEIGHTNOTE { get; set; }
        public double REMAINING_WEIGHT { get; set; }
        public double ITEM_PERCENT { get; set; }
        public int STATUS { get; set; }
    }
}
