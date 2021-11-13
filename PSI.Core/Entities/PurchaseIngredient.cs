using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class PurchaseIngredient : Entity
    {
        public long PurchaseWeighNoteId { get; set; }
        public string ItemName { get; set; }
        //public string Title { get; set; }
        public double ItemPercent { get; set; }
    }
}
