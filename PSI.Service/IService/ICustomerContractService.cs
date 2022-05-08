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
        // CustomerContractEnum
        public IQueryable<CustomerContractEnum.Types> GetPurchaseContractTypes();
        public Dictionary<int, CustomerContractEnum.Types> GetCustomerContracTypes();

        // Customer Contract
        CustomerContract GetCustomerContractsByCustomerUNID(Guid customerId);
        IQueryable<CustomerContract> GetEffectiveCustomerContracts();
        IQueryable<CustomerContract> GetPurchaseCustomerContracts();
        FunctionResult<CustomerContract> CreateCustomerContract(CustomerContract customerContract, AppUser operUser);
        CustomerContract GetCustomerContract(Guid unid);
        FunctionResult<CustomerContract> UpdateCustomerContract(CustomerContract customerContract, AppUser appUser);
        FunctionResult<CustomerContract> UpdateCustomerContractStatus(CustomerContract customerContract, CustomerContractEnum.Status contractStatus, AppUser appUser);

        // CustomerContractLog
        IQueryable<CustomerContractLog> GetCustomerContractLogs(Guid contractUNID);
        FunctionResult<CustomerContractLog> CreateCustomerContractLog(CustomerContractLog customerContractLog, AppUser operUser);

        // Functions
        public bool IsCustomerContractCompleted(Guid contractUNID);

    }
}
