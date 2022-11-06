using System.Collections.Generic;
using System.Linq;
using PSI.Core.Entities;
using PSI.Core.Enums;
using PSI.Core.Models.DTOModels;

namespace PSI.Service.IService
{
    public interface IProductItemServiceNew : IGenericService<ProductItem>
    {
        public List<DTO_ProductItem> GetDTOSalesProductItems();
        
    }
}
