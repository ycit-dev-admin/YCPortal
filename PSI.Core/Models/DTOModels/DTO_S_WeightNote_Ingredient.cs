using System;
using System.Collections.Generic;
using PSI.Core.Entities;

namespace PSI.Core.Models.DTOModels
{
    public class DTO_S_WeightNote_Ingredient : S_WeightNote_Ingredient
    {
        // Rel DTOs      
        //public List<DTO_PS_WriteOff_Log> DTO_PSWriteOffLog { get; set; }
        //public List<DTO_P_Inventory> DTO_PInventories { get; set; }
        public decimal CostUnitPrice { get; set; }
        public decimal SumWriteOffWeight { get; set; }
        public string[] RelPDocNoWithKgAndPrice { get; set; }


    }
}
