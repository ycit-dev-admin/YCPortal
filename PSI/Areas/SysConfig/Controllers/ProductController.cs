using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PSI.Areas.Purchase.Helpers;
using PSI.Areas.SysConfig.Mappers;
using PSI.Areas.SysConfig.Models;
using PSI.Areas.SysConfig.Models.PageModels;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Helpers;
using PSI.Infrastructure.Extensions;
using PSI.Infrastructure.Helpers;
using PSI.Models.VEModels;
using PSI.Service.IService;

namespace PSI.Areas.SysConfig.Controllers
{
    [Area("SysConfig")]
    public class ProductController : Controller
    {
        private readonly ICustomerService _customerService;
        private readonly IProductItemService _productItemService;

        private readonly IPsiService _psiService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly ProductControllerMapper _mapperHelper;


        public ProductController(ICustomerService customerService,
                                  IProductItemService productItemService,
                                  IPsiService psiService,
                                  UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _customerService = customerService;
            _productItemService = productItemService;
            _psiService = psiService;
            _mapperHelper = new ProductControllerMapper();
        }
        [HttpGet]
        [Authorize()]
        public IActionResult OnlineInfo()
        {
            var errMsg = "";
            /* Local Step Functions */
            FunctionResult<PageProductOnlineInfo> GetPageModel()
            {
                var productItemMapper = _mapperHelper.GetMapperOfOnlineInfo<ProductItem, VE_ProductItem>();
                var productItemList = _productItemService.GetAllProductItems();
                var veProductItemList = productItemMapper.Map<List<VE_ProductItem>>(productItemList);
                //var customerMapper = _mapperHelper.GetMapperOfOnlineInfo<CustomerInfo, VE_CustomerInfo>();
                //var customerInfoLs = _customerService.GetCustomerInfos();
                //var veCustomerInfoLs = customerMapper.Map<List<VE_CustomerInfo>>(customerInfoLs);



                var funRs = new FunctionResult<PageProductOnlineInfo>();
                funRs.ResultSuccess("", new PageProductOnlineInfo
                {
                    VeProductItemList = veProductItemList,
                    PsiTypeItems = _psiService.GetPsiTypeItems()
                    .ToPageSelectList(nameof(CodeTable.CODE_TEXT), nameof(CodeTable.CODE_VALUE))
                    //CustomerCarLs = veCustomerCarLs,
                    //CustomerInfoLs = veCustomerInfoLs
                });
                return funRs;
            }

            return View(GetPageModel().ResultValue);
        }

    }
}
