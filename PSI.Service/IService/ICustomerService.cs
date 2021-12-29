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
        // Customer Info
        FunctionResult CreateCustomerInfo(CustomerInfo customerInfo, List<CustomerCar> customerCars);
        CustomerInfo GetCustomerInfo(long id);
        IQueryable<CustomerInfo> GetCustomerInfos();
        IQueryable<CustomerInfo> GetPurchaseCustomerInfo();

        // Customer Contract
        IEnumerable<CustomerContract> GetCustomerContractsByCustomerId(long customerId);
        IEnumerable<CustomerContract> GetEffectiveCustomerContracts();

        // Customer Car
        IQueryable<CustomerCar> GetCustomerCarBy(long customerId);
        FunctionResult<CustomerCar> CreateCustomerCar(CustomerCar customerCar);

    }
}
