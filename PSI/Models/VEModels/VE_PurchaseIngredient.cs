using System;

namespace PSI.Models.VEModels
{
    public class VE_PurchaseIngredient
    {
        public Guid PurchaseWeightNoteUNID { get; set; }
        public Guid ProductUNID { get; set; }
        public string ItemName { get; set; }
        public double ItemPercent { get; set; }
    }

}
