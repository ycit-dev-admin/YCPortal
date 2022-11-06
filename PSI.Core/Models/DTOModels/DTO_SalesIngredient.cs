using System;

namespace PSI.Core.Models.DTOModels
{
    public class DTO_SalesIngredient
    {
        public Guid SALES_WEIGHTNOTE_UNID { get; set; }
        public Guid PRODUCT_UNID { get; set; }
        public string ITEM_NAME { get; set; }
        //public string Title { get; set; }
        public double ITEM_PERCENT { get; set; }
    }
}
