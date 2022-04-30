using System;
using System.Linq;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Helpers;

namespace PSI.Service.IService
{
    public interface IProductItemService
    {
        IQueryable<ProductItem> GetPurchaseProductItems();
        IQueryable<ProductItem> GetAllProductItems();
        ProductItem GetProductItem(Guid productUNID);
        ProductItem GetProductItem(string productName);
        FunctionResult<ProductItem> CreateProductItem(ProductItem productItem, AppUser operUser);
    }
}
