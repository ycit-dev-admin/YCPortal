using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PSI.Areas.Purchase.Helpers;
using PSI.Areas.SysConfig.Infrastructure.Extensions.VM_Model;
using PSI.Areas.SysConfig.Mappers;
using PSI.Areas.SysConfig.Models;
using PSI.Areas.SysConfig.Models.PageModels;
using PSI.Areas.SysConfig.Models.ShowModels;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Helpers;
using PSI.Infrastructure.Extensions;
using PSI.Models.VEModels;
using PSI.Service.IService;

namespace PSI.Areas.SysConfig.Controllers
{
    [Area("SysConfig")]
    public class ContractController : Controller
    {
        private readonly ICustomerService _customerService;
        private readonly IProductItemService _productItemService;
        private readonly IPsiService _psiService;
        private readonly UserManager<AppUser> _userManager;
        private readonly ContractControllerMapper _mapperHelper;


        public ContractController(ICustomerService customerService,
                                  IPsiService psiService,
                                  IProductItemService productItemService,
                                  UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _customerService = customerService;
            _psiService = psiService;
            _productItemService = productItemService;
            _mapperHelper = new ContractControllerMapper();
        }
        [HttpGet]
        [Authorize()]
        public IActionResult OnlineInfo()
        {
            var errMsg = "";

            /* Local Functions */
            FunctionResult<PageContractOnlineInfo> GetPageModel()
            {
                var veCustomerContractMapper = _mapperHelper.GetMapperOfOnlineInfo<CustomerContract, VE_CustomerContract>();
                var customerContractLs = _customerService.GetEffectiveCustomerContracts();
                var veCustomerContractLs = veCustomerContractMapper.Map<List<VE_CustomerContract>>(customerContractLs);
                var veCustomerInfoMapper = _mapperHelper.GetMapperOfOnlineInfo<CustomerInfo, VE_CustomerInfo>();
                var customerInfoLs = _customerService.GetCustomerInfos();
                var veCustomerInfoLs = veCustomerInfoMapper.Map<List<VE_CustomerInfo>>(customerInfoLs);


                var funRs = new FunctionResult<PageContractOnlineInfo>();
                funRs.ResultSuccess("", new PageContractOnlineInfo
                {
                    VeCustomerContractList = veCustomerContractLs,
                    VeCustomerInfoList = veCustomerInfoLs
                });
                return funRs;
            }


            // Step Result
            if (!GetPageModel().Success)
            {
                TempData["pageMsg"] = errMsg;
            }


            return View(GetPageModel().ResultValue);
        }

        [HttpGet]
        [Authorize()]
        public IActionResult CreateContractInfo()
        {
            var pageModel = new PageContractCreateContractInfo
            {
                PsiTypeItems = _psiService.GetPsiTypeItems()
                   .ToPageSelectList(nameof(CodeTable.CodeText), nameof(CodeTable.CodeValue)),
                CustomerInfoItems = _customerService.GetCustomerInfos()
                    .ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME), nameof(CustomerInfo.CUSTOMER_GUID)),
                ProductItems = _productItemService.GetAllProductItems().ToPageSelectList(
                    nameof(ProductItem.PRODUCT_NAME), nameof(ProductItem.PRODUCT_GUID)),
            };
            return View(pageModel);
        }


    }
}
