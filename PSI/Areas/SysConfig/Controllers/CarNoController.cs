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
    public class CarNoController : Controller
    {
        private readonly ICustomerService _customerService;
        private readonly IPsiService _psiService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly CarNoControllerMapper _mapperHelper;


        public CarNoController(ICustomerService customerService,
                                  IPsiService psiService,
                                  UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _customerService = customerService;
            _psiService = psiService;
            _mapperHelper = new CarNoControllerMapper();
        }
        [HttpGet]
        [Authorize()]
        public IActionResult OnlineInfo()
        {
            var errMsg = "";
            /* Local Step Functions */
            FunctionResult<PageCarNoOnlineInfo> GetPageModel()
            {
                var carMapper = _mapperHelper.GetMapperOfOnlineInfo<CustomerCar, VE_CustomerCar>();
                var customerCarLs = _customerService.GetCustomerCars();
                var veCustomerCarLs = carMapper.Map<List<VE_CustomerCar>>(customerCarLs);
                var customerMapper = _mapperHelper.GetMapperOfOnlineInfo<CustomerInfo, VE_CustomerInfo>();
                var customerInfoLs = _customerService.GetCustomerInfos();
                var veCustomerInfoLs = customerMapper.Map<List<VE_CustomerInfo>>(customerInfoLs);



                var funRs = new FunctionResult<PageCarNoOnlineInfo>();
                funRs.ResultSuccess("", new PageCarNoOnlineInfo
                {
                    CustomerCarLs = veCustomerCarLs,
                    CustomerInfoLs = veCustomerInfoLs
                });
                return funRs;
            }

            return View(GetPageModel().ResultValue);
        }

        [HttpGet]
        [Authorize()]
        public IActionResult _GetCarNoInfoModel(Guid carGUID = default, bool isOnlyQuery = false)
        {

            // Action variables
            var errMsg = "";

            // Step Functions 
            #region -- GetPageModel --
            FunctionResult<PageCustomer_GetCarNoInfoModel> GetPageModel()
            {
                // Make mapper
                var funcMapper = _mapperHelper.GetMapperOf_GetCarNoInfoModel<CustomerCar, PageCustomer_GetCarNoInfoModel>();

                // Set page model value
                var isNewOpen = carGUID == default;
                var pageModel = funcMapper.Map<PageCustomer_GetCarNoInfoModel>(isNewOpen ?
                    new CustomerCar() :
                    _customerService.GetCustomerCars().FirstOrDefault(aa => aa.CAR_GUID == carGUID));
                pageModel.IsNewOpen = isNewOpen;
                pageModel.IsOnlyQuery = isOnlyQuery;
                pageModel.ActionTypeName = isOnlyQuery ? "查詢" : 
                                           isNewOpen ? "建立" : "編輯";
                pageModel.FormActionName = isNewOpen ?
                    nameof(this.CreateCarNoInfo) :
                    nameof(this.UpdateCarNoInfo);
                pageModel.CustomerInfoItems = _customerService.GetCustomerInfos()
                    .ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME), nameof(CustomerInfo.CUSTOMER_GUID));

                // Return Result
                var funRs = new FunctionResult<PageCustomer_GetCarNoInfoModel>();
                funRs.ResultSuccess("", pageModel);
                return funRs;
            }
            #endregion



            // Step Result
            if (!GetPageModel().Success)
            {
                TempData["pageMsg"] = errMsg;
            }



            return PartialView("_GetCarNoInfoModel",
                GetPageModel().ResultValue);
        }

        [HttpPost]
        [Authorize()]
        public IActionResult CreateCarNoInfo(PageCreateCarNoInfo pageModel)
        {
            // Action variables
            var errMsg = "";

            // Step Functions 
            #region -- ValidPageModel --
            FunctionResult ValidPageModel()
            {
                var funRs = new FunctionResult();
                var validator = new PageCreateCarNoInfoValidator();
                var validRs = validator.Validate(pageModel);
                //var validRs = validator.Validate(pageModel, options => options.IncludeRuleSets("Create"));

                if (!validRs.IsValid)
                {
                    errMsg = $@"資料驗證失敗，請檢查頁面訊息!! 原因:{string.Join(',', validRs.Errors)}";
                    funRs.ResultFailure(errMsg);
                    return funRs;
                }

                var isDuplicate = _customerService.GetCustomerCar(pageModel.CarName) != null;
                if (isDuplicate)  // 檢核車牌有無重複
                {
                    errMsg = $@"資料驗證失敗!! 原因:{pageModel.CarName} 為重複車牌名稱";
                    funRs.ResultFailure(errMsg);
                    return funRs;
                }

                funRs.ResultSuccess("");
                return funRs;     // Return Result
            }
            #endregion
            #region -- CreateCarNoInfo --
            FunctionResult<CustomerCar> CreateCarNoInfo(PageCreateCarNoInfo pageModel)
            {
                var mapperCfgOfCustomerCar = _mapperHelper.GetMapperOfCreateCarNoInfo<PageCreateCarNoInfo, CustomerCar>();
                var customerCar = mapperCfgOfCustomerCar.Map<CustomerCar>(pageModel);
                var funcRs = _customerService.CreateCustomerCar(customerCar, _userManager.GetUserAsync(User).Result);
                funcRs.ResultSuccess("ok", customerCar);
                errMsg = funcRs.ErrorMessage;
                return funcRs;     // Return Result
            }
            #endregion


            // Step Result
            if (!ValidPageModel().Success ||
                !CreateCarNoInfo(pageModel).Success)
            {
                TempData["pageMsg"] = errMsg;
                return RedirectToAction("OnlineInfo");
            }


            // Successed
            //return View(pageModel);
            TempData["pageMsg"] = $@"車牌:{pageModel.CarName} 建立成功!!";
            return RedirectToAction("OnlineInfo");
        }

        [HttpPost]
        [Authorize()]
        public IActionResult UpdateCarNoInfo(PageUpdateCarNoInfo pageModel)
        {
            // Action variables
            var errMsg = "";

            // Step Functions 
            #region -- ValidPageModel --
            FunctionResult ValidPageModel()
            {
                var funRs = new FunctionResult();
                var validator = new PageUpdateCarNoInfoValidator();
                var validRs = validator.Validate(pageModel);

                if (!validRs.IsValid)
                {
                    errMsg = $@"資料驗證失敗，請檢查頁面訊息!! 原因:{string.Join(',', validRs.Errors)}";
                    funRs.ResultFailure(errMsg);
                }

                var carNoInfo = _customerService.GetCustomerCar(pageModel.CarName.Trim());
                var isDuplicate = carNoInfo != null &&
                                  carNoInfo.CAR_GUID != pageModel.CarGUID;

                if (isDuplicate)  // 檢核車牌有無重複
                {
                    errMsg = $@"資料驗證失敗!! 原因:{pageModel.CarName} 為重複車牌名稱";
                    funRs.ResultFailure(errMsg);
                    return funRs;
                }

                funRs.ResultSuccess("");
                return funRs;     // Return Result
            }
            #endregion
            #region -- UpdateCarNoInfo --
            FunctionResult<CustomerCar> UpdateCarNoInfo(PageUpdateCarNoInfo pageModel)
            {
                var mapperCfgOfCustomerCar = _mapperHelper.GetMapperOfUpdateCarNoInfo<PageUpdateCarNoInfo, CustomerCar>();
                var customerCar = mapperCfgOfCustomerCar.Map<CustomerCar>(pageModel);
                var funcRs = _customerService.UpdateCustomerCar(customerCar, _userManager.GetUserAsync(User).Result);
                funcRs.ResultSuccess("ok", customerCar);
                errMsg = funcRs.ErrorMessage;
                return funcRs;     // Return Result
            }
            #endregion


            // Step Result
            if (!ValidPageModel().Success ||
                !UpdateCarNoInfo(pageModel).Success)
            {
                TempData["pageMsg"] = errMsg;
                return RedirectToAction("OnlineInfo");
            }


            // Successed
            //return View(pageModel);
            TempData["pageMsg"] = $@"車牌:{pageModel.CarName} 更新成功!!";
            return RedirectToAction("OnlineInfo");
        }
    }
}
