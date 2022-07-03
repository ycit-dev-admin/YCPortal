using System;
using System.Collections.Generic;
using System.Linq;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Helpers;

namespace PSI.Service.IService
{
    public interface ICustomerInfoService
    {
        // Customer Info
        FunctionResult<CustomerInfo> CreateCustomerInfoForNormal(CustomerInfo customerInfo, AppUser operUser);
        FunctionResult<CustomerInfo> UpdateCustomerInfo(CustomerInfo customerInfo, AppUser appUser);
        CustomerInfo GetCustomerInfo(long id);
        CustomerInfo GetCustomerInfo(Guid guid);
        CustomerInfo GetCustomerInfoByCustomerName(string customerName);
        CustomerInfo GetCustomerInfoByCompanyName(string customerName);
        IQueryable<CustomerInfo> GetCustomerInfos();
        IQueryable<CustomerInfo> GetPurchaseCustomerInfo(IPSIEnumService iPSIEnumService);
        IQueryable<CustomerInfo> GetSalesCustomerInfo();

    }
}
