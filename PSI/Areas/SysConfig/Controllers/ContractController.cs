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
                    nameof(ProductItem.PRODUCT_NAME), nameof(ProductItem.PRODUCT_GUID))
            };
            return View(pageModel);
        }

        [HttpPost]
        [Authorize()]
        public IActionResult CreateContractInfo(PageContractCreateContractInfo pageModel)
        {
            // Action variables
            var errMsg = "";
            CustomerContract resultCustomerContract;

            // Step Functions 
            #region -- ValidPageModel --
            FunctionResult ValidPageModel()
            {
                var funRs = new FunctionResult();
                var validator = new PageContractCreateContractInfoValidator();
                var validRs = validator.Validate(pageModel, options => options.IncludeRuleSets("Skip"));
                if (!validRs.IsValid)
                {
                    errMsg = $@"資料驗證失敗，請檢查頁面訊息!! 原因:{string.Join(',', validRs.Errors)}";
                    funRs.ResultFailure(errMsg);
                    return funRs;
                }

                funRs.ResultSuccess("驗證成功");
                return funRs;     // Return Result
            }
            #endregion
            #region -- UpdateToDB --
            FunctionResult<CustomerContract> InsertToDB(PageContractCreateContractInfo pageModel)
            {
                var customerContractMapper = _mapperHelper.GetMapperOfCreateContractInfo<PageContractCreateContractInfo, CustomerContract>();
                var customerContract = customerContractMapper.Map<CustomerContract>(pageModel);
                var funcRs = _customerService.CreateCustomerContract(customerContract, _userManager.GetUserAsync(User).Result);
                errMsg = funcRs.ErrorMessage;
                resultCustomerContract = funcRs.Success ? funcRs.ResultValue : null;
                return funcRs;     // Return Result
            }
            #endregion


            // Step Result
            if (!ValidPageModel().Success ||
                !InsertToDB(pageModel).Success)
            {
                TempData["pageMsg"] = errMsg;


                pageModel.PsiTypeItems = _psiService.GetPsiTypeItems()
                  .ToPageSelectList(nameof(CodeTable.CodeText), nameof(CodeTable.CodeValue), pageModel.ContractType);
                pageModel.CustomerInfoItems = _customerService.GetCustomerInfos()
                    .ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME), nameof(CustomerInfo.CUSTOMER_GUID), pageModel.CustomerGUID.ToString());
                pageModel.ProductItems = _productItemService.GetAllProductItems().ToPageSelectList(
                    nameof(ProductItem.PRODUCT_NAME), nameof(ProductItem.PRODUCT_GUID), pageModel.ProductGUID.ToString());

                return View(pageModel);
            }


            // Successed
            TempData["pageMsg"] = $@"合約:{resultCustomerContract.CONTRACT_NAME} 建立成功!!";
            return RedirectToAction("OnlineInfo");

        }


        [HttpGet]
        [Authorize()]
        public IActionResult EditCustomerContract(Guid unid)
        {
            // Action variables
            var errMsg = "";

            // Step Functions 
            #region -- GetPageModel --
            FunctionResult<PageContractEditCustomerContract> GetPageModel(Guid unid)
            {
                // Make Mapper
                var pModelMapper = _mapperHelper.GetMapperOfEditCustomerContract<CustomerContract, PageContractEditCustomerContract>();
                
                                // Query Data
                var customerContract = _customerService.GetCustomerContract(unid);

                // Map to model
                var pageModel = pModelMapper.Map<PageContractEditCustomerContract>(customerContract);
                pageModel.PsiTypeItems = _psiService.GetPsiTypeItems()
                  .ToPageSelectList(nameof(CodeTable.CodeText), nameof(CodeTable.CodeValue), pageModel.ContractType);
                pageModel.CustomerInfoItems = _customerService.GetCustomerInfos()
                    .ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME), nameof(CustomerInfo.CUSTOMER_GUID), pageModel.CustomerGUID.ToString());
                pageModel.ProductItems = _productItemService.GetAllProductItems().ToPageSelectList(
                    nameof(ProductItem.PRODUCT_NAME), nameof(ProductItem.PRODUCT_GUID), pageModel.ProductGUID.ToString());

                // Return Result
                var funRs = new FunctionResult<PageContractEditCustomerContract>();
                funRs.ResultSuccess("", pageModel);
                return funRs;
            }
            #endregion


            // Step Result

            return View(GetPageModel(unid).ResultValue);
        }


    }
}
