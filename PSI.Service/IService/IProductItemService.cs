using System;
using System.Linq;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Helpers;
using PSI.Service.Service;

namespace PSI.Service.IService
{
    public interface IProductItemService
    {
        IQueryable<ProductItem> GetPurchaseProductItems(IPSIEnumService iPSIEnumService);
        IQueryable<ProductItem> GetSalesProductItems(IPSIEnumService iPSIEnumService);
        IQueryable<ProductItem> GetAllProductItems();
        ProductItem GetProductItem(Guid productUNID);
        ProductItem GetProductItem(string productName);
        FunctionResult<ProductItem> CreateProductItem(ProductItem productItem, AppUser operUser);
        FunctionResult<ProductItem> UpdateProductItem(ProductItem sourceEntity, AppUser operUser);
    }
}
