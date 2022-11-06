using System.Collections.Generic;
using System.Linq;
using PSI.Core.Entities;
using PSI.Core.Models.DTOModels;

namespace PSI.Service.IService
{
    public interface ICustomerInfoServiceNew : IGenericService<CustomerInfo>
    {

        //Expression<Func<CustomerInfo, bool>> GetSalesCustomerInfo();
        List<DTO_CustomerInfo> GetDTOSalesCustomerInfo();

    }
}
