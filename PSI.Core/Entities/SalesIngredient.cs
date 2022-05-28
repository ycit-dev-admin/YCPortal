using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class SalesIngredient : Entity
    {
        public Guid SALES_WEIGHTNOTE_UNID { get; set; }
        public Guid PRODUCT_UNID { get; set; }
        public string ITEM_NAME { get; set; }
        //public string Title { get; set; }
        public double ITEM_PERCENT { get; set; }
    }
}
