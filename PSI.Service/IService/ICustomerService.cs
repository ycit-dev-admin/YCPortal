using System.Collections.Generic;
using System.Linq;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Helpers;

namespace PSI.Service.IService
{
    public interface ICustomerService
    {
        // Customer Info
        FunctionResult CreateCustomerInfo(CustomerInfo customerInfo, List<CustomerCar> customerCars, AppUser operUser);
        FunctionResult<CustomerInfo> UpdateCustomerInfo(CustomerInfo customerInfo, AppUser appUser);
        CustomerInfo GetCustomerInfo(long id);
        IQueryable<CustomerInfo> GetCustomerInfos();
        IQueryable<CustomerInfo> GetPurchaseCustomerInfo();

        // Customer Contract
        IEnumerable<CustomerContract> GetCustomerContractsByCustomerId(long customerId);
        IEnumerable<CustomerContract> GetEffectiveCustomerContracts();

        // Customer Car
        IQueryable<CustomerCar> GetCustomerCarBy(long customerId);
        FunctionResult<CustomerCar> CreateCustomerCar(CustomerCar customerCar, AppUser appUser);

    }
}
