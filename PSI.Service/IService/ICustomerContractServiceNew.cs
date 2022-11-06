using System;
using System.Collections.Generic;
using System.Linq;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Enums;
using PSI.Core.Helpers;
using PSI.Core.Models.DTOModels;

namespace PSI.Service.IService
{
    public interface ICustomerContractServiceNew : IGenericService<CustomerContract>
    {
        List<DTO_CustomerContract> GetSalesCustomerContracts();

    }
}
