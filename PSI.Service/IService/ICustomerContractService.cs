using System;
using System.Collections.Generic;
using System.Linq;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Enums;
using PSI.Core.Helpers;

namespace PSI.Service.IService
{
    public interface ICustomerContractService
    {
        // Customer Contract
        IEnumerable<CustomerContract> GetCustomerContractsByCustomerId(Guid customerId);
        IQueryable<CustomerContract> GetEffectiveCustomerContracts();
        IQueryable<CustomerContract> GetPurchaseCustomerContracts();
        FunctionResult<CustomerContract> CreateCustomerContract(CustomerContract customerContract, AppUser operUser);
        CustomerContract GetCustomerContract(Guid unid);
        public IQueryable<CustomerContractEnum.Types> GetPurchaseContractTypes();
        FunctionResult<CustomerContract> UpdateCustomerContract(CustomerContract customerContract, AppUser appUser);


    }
}
