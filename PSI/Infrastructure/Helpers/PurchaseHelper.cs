using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Core.Entities;
using PSI.Models.VEModels;
using PSI.Service.IService;

namespace PSI.Infrastructure.Helpers
{
    public class PurchaseHelper
    {
        private readonly IMapper _mapper;
        public PurchaseHelper(IMapper mapper)
        {
            _mapper = mapper;
        }

        public PurchaseWeightNote GetPurchaseWeightNote(VE_PurchaseWeightNote vmPurchaseWeightNote, string docNo)
        {
            var purchaseWeightNote = _mapper.Map<PurchaseWeightNote>(vmPurchaseWeightNote);
            purchaseWeightNote.DocNo = docNo;

            return purchaseWeightNote;
        }
        public List<PurchaseIngredient> GetPurchaseIngredientLs(List<VE_PurchaseIngredient_Query> purchaseDetailInfoLs)
        {
            return _mapper.Map<List<PurchaseIngredient>>(purchaseDetailInfoLs);

        }

        public List<SelectListItem> PageGetCustomerInfoItems(ICustomerService customerService)
        {
            return customerService.GetPurchaseCustomerInfo()
                    .Select(aa => new SelectListItem
                    {
                        Text = aa.CustomerName,
                        Value = aa.Id.ToString()
                    }).ToList();
        }
        public List<SelectListItem> PageGetProductItems(IProductItemService productItemService)
        {
            return productItemService.GetPurchaseProductItems()
                .Select(aa => new SelectListItem
                {
                    Text = aa.ProductName,
                    Value = aa.Id.ToString()
                }).ToList();
        }
        public List<SelectListItem> PageGetPsiTypeItems(IPsiService psiService)
        {
            return psiService.GetPsiTypeItems()
                .Select(aa => new SelectListItem
                {
                    Text = aa.CodeText,
                    Value = aa.CodeValue
                }).ToList();
        }
        public List<SelectListItem> PageGetPayTypeItems(IPsiService psiService)
        {
            return psiService.GetPayTypeItems()
                .Select(aa => new SelectListItem
                {
                    Text = aa.CodeText,
                    Value = aa.CodeValue
                }).ToList();
        }


    }
}
