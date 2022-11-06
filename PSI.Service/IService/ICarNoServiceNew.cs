using System.Collections.Generic;
using PSI.Core.Entities;
using PSI.Core.Models.DTOModels;

namespace PSI.Service.IService
{
    public interface ICarNoServiceNew : IGenericService<CustomerCar>
    {
        public List<DTO_CustomerCar> GetDTOSalesCustomerCar();
    }
}
