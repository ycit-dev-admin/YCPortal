using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class CustomerContract : Entity
    {
        public long CustomerId { get; set; }        
        public string ContractName { get; set; }
        public double DealWeight { get; set; }
        public double ActualWeight { get; set; }
        public double DealUnitPrice { get; set; }
        public string IsEffective { get; set; }  
        public string Remark { get; set; }
    }
}
