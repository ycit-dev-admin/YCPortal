using System;
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
        FunctionResult<CustomerInfo> CreateCustomerInfo(CustomerInfo customerInfo, AppUser operUser);
        FunctionResult<CustomerInfo> UpdateCustomerInfo(CustomerInfo customerInfo, AppUser appUser);
        CustomerInfo GetCustomerInfo(long id);
        CustomerInfo GetCustomerInfo(Guid guid);
        CustomerInfo GetCustomerInfoByCustomerName(string customerName);
        CustomerInfo GetCustomerInfoByCompanyName(string customerName);
        IQueryable<CustomerInfo> GetCustomerInfos();
        IQueryable<CustomerInfo> GetPurchaseCustomerInfo();

        // CustomerContractLog
        IQueryable<CustomerContractLog> GetCustomerContractLogs(Guid contractUNID);

        // Customer Car
        IQueryable<CustomerCar> GetCustomerCar(long customerId);
        IQueryable<CustomerCar> GetCustomerCar(Guid customerGuid);
        CustomerCar GetCustomerCar(string carNo);

        IQueryable<CustomerCar> GetCustomerCars();
        FunctionResult<CustomerCar> CreateCustomerCar(CustomerCar customerCar, AppUser appUser);
        FunctionResult<CustomerCar> UpdateCustomerCar(CustomerCar customerCar, AppUser appUser);

    }
}
