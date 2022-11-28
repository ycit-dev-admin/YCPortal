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
        public Guid WRITEOFF_PRODUCT_UNID { get; set; }
        public string WRITEOFF_ITEM_NAME { get; set; }
        public double WRITEOFF_WEIGHT { get; set; }
    }
}
