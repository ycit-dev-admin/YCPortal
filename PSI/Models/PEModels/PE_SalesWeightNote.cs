using System;
using PSI.Core.Entities;

namespace PSI.Models.PEModels
{
    public class PE_SalesWeightNote : S_WeightNote
    {
        public string CustomerName { get; set; }
        public string MainProductItemName { get; set; }
        public decimal EstimateInvoicePrice { get; set; }  // 預估請款金額


    }

}
