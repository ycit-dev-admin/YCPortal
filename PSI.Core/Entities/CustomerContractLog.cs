using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class CustomerContractLog : Entity
    {
        public Guid CONTRACT_GUID { get; set; }  // 認列合約
        public double CALCULATE_WEIGHT { get; set; }
        public string IS_EFFECTIVE { get; set; }
        public string REMARK { get; set; }
    }
}
