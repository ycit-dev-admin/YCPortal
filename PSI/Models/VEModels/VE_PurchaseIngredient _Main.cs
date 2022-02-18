using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;

namespace PSI.Models.VEModels
{
    public class VE_PurchaseIngredient_Main
    {
        protected long PurchaseWeighNoteId { get; set; }
        protected long ProductId { get; set; }
        protected string ItemName { get; set; }
        protected double ItemPercent { get; set; }
    }

}
