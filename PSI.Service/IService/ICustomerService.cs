using PSI.Core.Entities;
using PSI.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PSI.Service.IService
{
    public interface ICustomerService
    {
        FunctionResult CreateCustomerInfo(CustomerInfo customerInfo, List<CustomerCar> customerCars);

        Task<IQueryable<CustomerInfo>> GetCustomerInfosAsync();
        IEnumerable<CustomerInfo> GetCustomerInfosByPsiType(string psiType);
        IEnumerable<CustomerContract> GetCustomerContractsByCustomerId(long customerId);
        IEnumerable<CustomerContract> GetEffectiveCustomerContracts();
        IEnumerable<CustomerCar> GetCustomerCarByCustomerId(long customerId);
    }
}
