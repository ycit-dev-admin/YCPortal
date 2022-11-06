using System.Collections.Generic;
using PSI.Core.Entities;

namespace PSI.Core.Models.DTOModels
{
    public class DTO_CustomerContract : CustomerContract
    {
        // Rel DTOs
        public List<DTO_SalesWeightNote> DTO_SalesWeightNotes { get; set; }

        // DTO Values
        public double SumEffectivedSalesWeight { get; set; }  // 出貨重量

        public List<DTO_SalesWeightNoteStepData> DTO_SalesWeightNoteStepDatas { get; set; }
    }
}
