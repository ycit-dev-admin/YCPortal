using System;
using System.Collections.Generic;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
    public class ContractController : Controller
    {
        private readonly ICustomerService _customerService;
        private readonly ICustomerContractService _customerContractService;
        private readonly IProductItemService _productItemService;
        private readonly IPsiService _psiService;
        private readonly UserManager<AppUser> _userManager;
        private readonly ContractControllerMapper _mapperHelper;
        private readonly PageItemFromEnumHelper _enumHelper;


        public ContractController(ICustomerService customerService,
                                  ICustomerContractService customerContractService,
                                  IPsiService psiService,
                                  IProductItemService productItemService,
                                  UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _customerService = customerService;
            _customerContractService = customerContractService;
            _psiService = psiService;
            _productItemService = productItemService;
            _mapperHelper = new ContractControllerMapper();
            _enumHelper = new PageItemFromEnumHelper();
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
                var customerContractLs = _customerContractService.GetEffectiveCustomerContracts();
                var veCustomerContractLs = veCustomerContractMapper.Map<List<VE_CustomerContract>>(customerContractLs);
                var veCustomerInfoMapper = _mapperHelper.GetMapperOfOnlineInfo<CustomerInfo, VE_CustomerInfo>();
                var customerInfoLs = _customerService.GetCustomerInfos();
                var veCustomerInfoLs = veCustomerInfoMapper.Map<List<VE_CustomerInfo>>(customerInfoLs);


                var funRs = new FunctionResult<PageContractOnlineInfo>();
                funRs.ResultSuccess("", new PageContractOnlineInfo
                {
                    VeCustomerContractList = veCustomerContractLs,
                    VeCustomerInfoList = veCustomerInfoLs,
                    ContractTypeItems = _psiService.GetContractTypeItems()
                   .ToPageSelectList(nameof(CodeTable.CODE_TEXT), nameof(CodeTable.CODE_VALUE))
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
                ContractTypeItems = _psiService.GetContractTypeItems()
                   .ToPageSelectList(nameof(CodeTable.CODE_TEXT), nameof(CodeTable.CODE_VALUE)),
                CustomerInfoItems = _customerService.GetCustomerInfos()
                    .ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME), nameof(CustomerInfo.CUSTOMER_GUID)),
                ProductItems = _productItemService.GetAllProductItems().ToPageSelectList(
                    nameof(ProductItem.PRODUCT_NAME), nameof(ProductItem.PRODUCT_UNID))
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
            #region -- InsertToDB --
            FunctionResult<CustomerContract> InsertToDB(PageContractCreateContractInfo pageModel)
            {
                var customerContractMapper = _mapperHelper.GetMapperOfCreateContractInfo<PageContractCreateContractInfo, CustomerContract>();
                var customerContract = customerContractMapper.Map<CustomerContract>(pageModel);
                var funcRs = _customerContractService.CreateCustomerContract(customerContract, _userManager.GetUserAsync(User).Result);
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


                pageModel.ContractTypeItems = _psiService.GetContractTypeItems()
                  .ToPageSelectList(nameof(CodeTable.CODE_TEXT), nameof(CodeTable.CODE_VALUE), pageModel.ContractType);
                pageModel.CustomerInfoItems = _customerService.GetCustomerInfos()
                    .ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME), nameof(CustomerInfo.CUSTOMER_GUID), pageModel.CustomerGUID.ToString());
                pageModel.ProductItems = _productItemService.GetAllProductItems().ToPageSelectList(
                    nameof(ProductItem.PRODUCT_NAME), nameof(ProductItem.PRODUCT_UNID), pageModel.ProductGUID.ToString());

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
                var veCustomerContractLogMapper = _mapperHelper.GetMapperOfEditCustomerContract<CustomerContractLog, VE_CustomerContractLog>();

                // Query Data
                var customerContract = _customerContractService.GetCustomerContract(unid);
                var customerContractLogList = _customerService.GetCustomerContractLogs(unid);

                // Map to model
                var veCustomerContractLogList = veCustomerContractLogMapper.Map<List<VE_CustomerContractLog>>(customerContractLogList);
                var pageModel = pModelMapper.Map<PageContractEditCustomerContract>(customerContract);
                pageModel.ContractStatusItems = _enumHelper.GetContractStatus();
                pageModel.VE_CustomerContractLogList = veCustomerContractLogList;
                pageModel.ContractTypeItems = _psiService.GetContractTypeItems()
                  .ToPageSelectList(nameof(CodeTable.CODE_TEXT), nameof(CodeTable.CODE_VALUE));
                pageModel.CustomerInfoItems = _customerService.GetCustomerInfos()
                    .ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME), nameof(CustomerInfo.CUSTOMER_GUID));
                pageModel.ProductItems = _productItemService.GetAllProductItems().ToPageSelectList(
                    nameof(ProductItem.PRODUCT_NAME), nameof(ProductItem.PRODUCT_UNID));

                // Return Result
                var funRs = new FunctionResult<PageContractEditCustomerContract>();
                funRs.ResultSuccess("", pageModel);
                return funRs;
            }
            #endregion


            // Step Result

            return View(GetPageModel(unid).ResultValue);
        }

        [HttpPost]
        [Authorize()]
        public IActionResult EditCustomerContract(PageContractEditCustomerContract pageModel)
        {
            // Action variables
            var errMsg = "";
            CustomerContract resultCustomerContract;

            // Step Functions 
            #region -- ValidPageModel --
            FunctionResult ValidPageModel(PageContractEditCustomerContract pageModel)
            {

                var funRs = new FunctionResult();
                var validator = new PageContractEditCustomerContractValidator();
                var validRs = validator.Validate(pageModel, options => options.IncludeRuleSets("Skip"));
                if (!validRs.IsValid)
                {
                    errMsg = $@"資料驗證失敗，請檢查頁面訊息!! 原因:{string.Join(',', validRs.Errors)}";
                    funRs.ResultFailure(errMsg);
                    return funRs;
                }

                funRs.ResultSuccess("");
                return funRs;     // Return Result
            }
            #endregion
            #region -- UpdateToDB --
            FunctionResult<CustomerContract> UpdateToDB(PageContractEditCustomerContract pageModel)
            {
                var customerContractMapper = _mapperHelper.GetMapperOfEditCustomerContract<PageContractEditCustomerContract, CustomerContract>();
                var customerContract = customerContractMapper.Map<CustomerContract>(pageModel);
                var funcRs = _customerContractService.UpdateCustomerContract(customerContract, _userManager.GetUserAsync(User).Result);
                errMsg = funcRs.ErrorMessage;
                resultCustomerContract = funcRs.Success ? funcRs.ResultValue : null;
                return funcRs;     // Return Result
            }
            #endregion


            // Step Result
            if (!ValidPageModel(pageModel).Success ||
                !UpdateToDB(pageModel).Success)
            {
                TempData["pageMsg"] = errMsg;
                var veCustomerContractLogMapper = _mapperHelper.GetMapperOfEditCustomerContract<CustomerContractLog, VE_CustomerContractLog>();
                var customerContractLogList = _customerService.GetCustomerContractLogs(pageModel.ContractGUID);
                var veCustomerContractLogList = veCustomerContractLogMapper.Map<List<VE_CustomerContractLog>>(customerContractLogList);
                pageModel.ContractStatusItems = _enumHelper.GetContractStatus(pageModel.ContractStatus);
                pageModel.VE_CustomerContractLogList = veCustomerContractLogList;
                pageModel.ContractTypeItems = _psiService.GetContractTypeItems()
                  .ToPageSelectList(nameof(CodeTable.CODE_TEXT), nameof(CodeTable.CODE_VALUE), pageModel.ContractType);
                pageModel.CustomerInfoItems = _customerService.GetCustomerInfos()
                    .ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME), nameof(CustomerInfo.CUSTOMER_GUID), pageModel.CustomerGUID.ToString());
                pageModel.ProductItems = _productItemService.GetAllProductItems().ToPageSelectList(
                    nameof(ProductItem.PRODUCT_NAME), nameof(ProductItem.PRODUCT_UNID), pageModel.ProductGUID.ToString());

                return View(pageModel);
            }


            // Successed
            TempData["pageMsg"] = $@"合約名稱:{resultCustomerContract.CONTRACT_NAME} 更新成功!!";
            return RedirectToAction("OnlineInfo");
        }
    }
}
