using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Models.PurchaseWeightNote;
using PSI.Service.IService;

namespace PSI.Infrastructure.Extensions.VM_Model
{
    public static class VM_PurchaseWeightNoteExtension
    {
        public static VM_PurchaseWeightNote SetCustomerInfoItems(this VM_PurchaseWeightNote vmPurchaseWeightNote, ICustomerService customerService)
        {
            vmPurchaseWeightNote.CustomerInfoItems = customerService.GetPurchaseCustomerInfo()
                .Select(aa => new SelectListItem
                {
                    Text = aa.CustomerName,
                    Value = aa.Id.ToString()
                }).ToList();


            return vmPurchaseWeightNote;
        }
        public static VM_PurchaseWeightNote SetProductItems(this VM_PurchaseWeightNote vmPurchaseWeightNote, IProductItemService productItemService)
        {
            vmPurchaseWeightNote.ProductItemItems = productItemService.GetPurchaseProductItems()
                .Select(aa => new SelectListItem
                {
                    Text = aa.ProductName,
                    Value = aa.Id.ToString()
                }).ToList();
            return vmPurchaseWeightNote;
        }       
    }
}
