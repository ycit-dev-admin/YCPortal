﻿using System;
using System.Collections.Generic;
using PSI.Core.Entities;

namespace PSI.Core.Models.DTOModels
{
    public class DTO_SalesWeightNoteStepData : SalesWeightNoteStepData
    {
        // Rel DTOs
        public DTO_ProductItem DTO_ProductItem { get; set; }
        public DTO_CodeTable DTO_ReceiveTypeInfo { get; set; }





    }
}
