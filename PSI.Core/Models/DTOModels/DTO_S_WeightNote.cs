﻿using System;
using System.Collections.Generic;
using PSI.Core.Entities;

namespace PSI.Core.Models.DTOModels
{
    public class DTO_S_WeightNote : S_WeightNote
    {
        // Rel DTOs
        public DTO_CustomerInfo DTO_CustomerInfo { get; set; }
        public DTO_CustomerCar DTO_CustomerCar { get; set; }
        public List<DTO_S_WeightNote_Ingredient> DTO_SWeightNoteIngredients { get; set; }
        public List<DTO_PS_WriteOff_Log> DTO_PSWriteOffLog { get; set; }
        public List<DTO_P_Inventory> DTO_PInventories { get; set; }
        public List<DTO_SalesWeightNoteStepData> DTO_SalesWeightNoteStepDatas { get; set; }
        public List<DTO_CustomerContract> DTO_CustomerContracts { get; set; }
        public DTO_ProductItem DTO_ProductItem { get; set; }





        //public decimal EstimateInvoicePrice { get; set; }  // 預估請款金額
        public string EstimateReceivedTypePayTypeName { get; set; }

    }
}
