using System;
using PSI.Core.Entities;

namespace PSI.Models.VEModels
{
    public class VE_CustomerInfo
    {
        public string PsiTypeName { get; set; }
        public string CustomerGUID { get; set; }
        public string CompanyName { get; set; }
        public string CustomerName { get; set; }
        public DateTime UpdateTime { get; set; }
        public string UpdateEmpNo { get; set; }

    }
}
