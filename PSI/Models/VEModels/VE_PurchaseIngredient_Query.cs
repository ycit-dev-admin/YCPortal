using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;

namespace PSI.Models.VEModels
{
    public class VE_PurchaseIngredient_Query : VE_PurchaseIngredient_Main
    {
        public new long ProductId
        {
            get => ProductId;
            set => ProductId = value;
        }
        public new string ItemName
        {
            get => ItemName;
            set => ItemName = value;
        }
        public new double ItemPercent
        {
            get => ItemPercent;
            set => ItemPercent = value;
        }
    }

}
