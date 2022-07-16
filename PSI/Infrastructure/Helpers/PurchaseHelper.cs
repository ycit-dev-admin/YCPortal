using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Core.Entities;
using PSI.Models.PEModels;
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
            purchaseWeightNote.DOC_NO = docNo;

            return purchaseWeightNote;
        }
        public List<PurchaseIngredient> GetPurchaseIngredientLs(List<VE_PurchaseIngredient> purchaseDetailInfoLs)
        {
            return _mapper.Map<List<PurchaseIngredient>>(purchaseDetailInfoLs);

        }
        public List<PurchaseIngredient> GetPurchaseIngredientLs(List<PE_SalesIngredient> peSalesIngredientList)
        {
            return _mapper.Map<List<PurchaseIngredient>>(peSalesIngredientList);

        }

        //public List<SelectListItem> PageGetCustomerInfoItems(ICustomerService customerService)
        //{
        //    return customerService.GetPurchaseCustomerInfo()
        //            .Select(aa => new SelectListItem
        //            {
        //                Text = aa.CUSTOMER_NAME,
        //                Value = aa.ID.ToString()
        //            }).ToList();
        //}
        //public List<SelectListItem> PageGetProductItems(IProductItemService productItemService)
        //{
        //    return productItemService.GetPurchaseProductItems()
        //        .Select(aa => new SelectListItem
        //        {
        //            Text = aa.PRODUCT_NAME,
        //            Value = aa.ID.ToString()
        //        }).ToList();
        //}
        public List<SelectListItem> PageGetPsiTypeItems(IPsiService psiService)
        {
            return psiService.GetPsiTypeItems()
                .Select(aa => new SelectListItem
                {
                    Text = aa.CODE_TEXT,
                    Value = aa.CODE_VALUE
                }).ToList();
        }
        public List<SelectListItem> PageGetPayTypeItems(IPsiService psiService)
        {
            return psiService.GetPayTypeItems()
                .Select(aa => new SelectListItem
                {
                    Text = aa.CODE_TEXT,
                    Value = aa.CODE_VALUE
                }).ToList();
        }


    }
}
