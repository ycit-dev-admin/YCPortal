using System;

namespace PSI.Models.VEModels
{
    public class VE_CustomerInfo
    {
        public Guid CustomerGUID { get; set; }
        public string CompanyName { get; set; }
        public string CustomerName { get; set; }
        public DateTime UpdateTime { get; set; }
        public string UpdateEmpNo { get; set; }

    }
}
