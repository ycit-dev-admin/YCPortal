using PSI.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace PSI.Service.IService
{
    public interface IProductItemService
    {
        IEnumerable<ProductItem> GetProductItemsByPsiType(string psiType);
    }
}
