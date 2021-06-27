using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class CustomerCar : Entity
    {
        public long CustomerId { get; set; }
        public string CarName { get; set; }
        public string IsEffective { get; set; }

        public string Remark { get; set; }
    }
}
