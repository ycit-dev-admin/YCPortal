using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Core.Entities;

namespace PSI.Areas.Purchase.Helpers
{
    public class PurchasePageItemHelper
    {
        public PurchasePageItemHelper()
        {
        }
        public List<SelectListItem> PageGetCustomerInfoItems(IEnumerable<CustomerInfo> customerInfoList)
        {
            return customerInfoList
                    .Select(aa => new SelectListItem
                    {
                        Text = aa.CustomerName,
                        Value = aa.Id.ToString()
                    }).ToList();
        }
        public List<SelectListItem> PageGetProductItems(IEnumerable<ProductItem> productItemList)
        {
            return productItemList
                .Select(aa => new SelectListItem
                {
                    Text = aa.ProductName,
                    Value = aa.Id.ToString()
                }).ToList();
        }
        public List<SelectListItem> PageGetPayTypeItems(IQueryable<CodeTable> payTypeInfoList)
        {
            return payTypeInfoList
                .Select(aa => new SelectListItem
                {
                    Text = aa.CodeText,
                    Value = aa.CodeValue
                }).ToList();
        }
    }
}
