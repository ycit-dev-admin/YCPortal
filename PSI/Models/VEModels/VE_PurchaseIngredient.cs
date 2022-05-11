using System;

namespace PSI.Models.VEModels
{
    public class VE_PurchaseIngredient
    {
        public string PurchaseWeightNoteUNID { get; set; }
        public string ProductUNID { get; set; }
        public string ItemName { get; set; }
        public double ItemPercent { get; set; }
    }

}
