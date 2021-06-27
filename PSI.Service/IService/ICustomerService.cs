using PSI.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace PSI.Service.IService
{
    public interface ICustomerService
    {
        IEnumerable<CustomerInfo> GetCustomerInfosByPsiType(string psiType);
    }
}
