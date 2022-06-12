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
        FunctionResult<CustomerInfo> CreateCustomerInfoForNormal(CustomerInfo customerInfo, AppUser operUser);
        FunctionResult<CustomerInfo> UpdateCustomerInfo(CustomerInfo customerInfo, AppUser appUser);
        CustomerInfo GetCustomerInfo(long id);
        CustomerInfo GetCustomerInfo(Guid guid);
        CustomerInfo GetCustomerInfoByCustomerName(string customerName);
        CustomerInfo GetCustomerInfoByCompanyName(string customerName);
        IQueryable<CustomerInfo> GetCustomerInfos();
        

        // Customer Car
        CustomerCar GetCustomerCarByUNID(Guid carNoUNID);

        IQueryable<CustomerCar> GetCustomerCarByCustomerUNID(Guid customerGUID);
        CustomerCar GetCustomerCar(string carNo);

        IQueryable<CustomerCar> GetCustomerCars();
        FunctionResult<CustomerCar> CreateCustomerCarForNormal(CustomerCar customerCar, AppUser appUser);
        FunctionResult<CustomerCar> UpdateCustomerCar(CustomerCar customerCar, AppUser appUser);

    }
}
