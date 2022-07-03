using System.Linq;
using PSI.Core.Enums;

namespace PSI.Service.IService
{
    public interface ICustomerContractEnumService
    {
        // CustomerContractEnum      
        public IQueryable<CustomerContractEnum.Types> GetAllContracTypes();
        public IQueryable<CustomerContractEnum.Status> GetAllContracStatus();

    }
}
