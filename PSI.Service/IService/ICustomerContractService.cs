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
        //// CustomerContractEnum
        //public IQueryable<CustomerContractEnum.Types> GetPurchaseContractTypes();
        //public Dictionary<int, CustomerContractEnum.Types> GetCustomerContracTypes();

        // Customer Contract
        IQueryable<CustomerContract> GetEffectiveCustomerContracts();
        IQueryable<CustomerContract> GetPurchaseCustomerContracts();
        IQueryable<CustomerContract> GetSalesCustomerContracts();
        public IQueryable<CustomerContract> GetContracts(Guid cutsomerUNID);
        public IQueryable<CustomerContract> GetContracts(Guid cutsomerUNID, IQueryable<CustomerContractEnum.Status> contractStatus);
        public IQueryable<CustomerContract> GetContracts(Guid cutsomerUNID,
            IQueryable<CustomerContractEnum.Status> contractStatus,
            IQueryable<CustomerContractEnum.Types> contractTypes);
        FunctionResult<CustomerContract> CreateCustomerContract(CustomerContract customerContract, AppUser operUser);
        CustomerContract GetCustomerContract(Guid contractUNID);
        IQueryable<CustomerContract> GetContractsByCustomerUNID(Guid customerUNID);
        FunctionResult<CustomerContract> UpdateCustomerContract(CustomerContract customerContract, AppUser appUser);
        FunctionResult<CustomerContract> UpdateCustomerContractStatus(CustomerContract customerContract, CustomerContractEnum.Status contractStatus, AppUser appUser);
        FunctionResult<CustomerContract> UpdateCustomerContractBySpecFields(CustomerContract customerContract, List<string> onlyUpdateFields, AppUser appUser);

        // CustomerContractLog
        IQueryable<CustomerContractLog> GetCustomerContractLogs(Guid contractUNID);
        IQueryable<CustomerContractLog> GetContractLogsByContractUNIDs(List<Guid> contractUNIDs);
        FunctionResult<CustomerContractLog> CreateCustomerContractLog(CustomerContractLog customerContractLog, AppUser operUser);

        // Functions
        public bool IsCustomerContractCompleted(Guid contractUNID);

    }
}
