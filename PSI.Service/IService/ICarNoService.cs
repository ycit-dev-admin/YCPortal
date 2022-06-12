using System;
using System.Collections.Generic;
using System.Linq;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Enums;
using PSI.Core.Helpers;

namespace PSI.Service.IService
{
    public interface ICarNoService
    {
        /* Customer Car */
        CustomerCar GetCustomerCarByUNID(Guid carNoUNID);

        IQueryable<CustomerCar> GetCustomerCarByCustomerUNID(Guid customerGUID);
        IQueryable<CustomerCar> GetSalesOfCarInfo(IPSIEnumService iPSIEnumService);
        CustomerCar GetCustomerCar(string carNo);

        IQueryable<CustomerCar> GetAllCustomerCars();
        FunctionResult<CustomerCar> CreateCustomerCarForNormal(CustomerCar customerCar, AppUser appUser);
        FunctionResult<CustomerCar> UpdateCustomerCar(CustomerCar customerCar, AppUser appUser);

    }
}
