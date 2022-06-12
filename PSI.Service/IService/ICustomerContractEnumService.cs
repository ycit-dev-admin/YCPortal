using System.Linq;
using PSI.Core.Enums;

namespace PSI.Service.IService
{
    public interface ICustomerContractEnumService
    {
        // CustomerContractEnum
        public IQueryable<CustomerContractEnum.Types> GetPurchaseContractTypes();
        public IQueryable<CustomerContractEnum.Types> GetSaleContractTypes();
        public IQueryable<CustomerContractEnum.Types> GetAllContracTypes();
        public IQueryable<CustomerContractEnum.Status> GetAllContracStatus(); 
        public IQueryable<CustomerContractEnum.Status> GetContracOngoStatus();
    }
}
