using System;
using System.Collections.Generic;
using System.Linq;
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
using PSI.Models.VEModels;
using PSI.Service.IService;

namespace PSI.Areas.SysConfig.Controllers
{
    [Area("SysConfig")]
    public class CarNoController : Controller
    {
        private readonly ICustomerService _customerService;
        private readonly IPsiService _psiService;
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
                var customerCarLs = _customerService.GetCustomerCars();
                var cfgMapper = _mapperHelper.GetMapperOfOnlineInfo<CustomerCar, VE_CustomerCar>();
                var veCustomerInfoLs = cfgMapper.Map<List<VE_CustomerCar>>(customerCarLs);

                var funRs = new FunctionResult<PageCarNoOnlineInfo>();
                funRs.ResultSuccess("", new PageCarNoOnlineInfo
                {
                    CustomerCarInfoLs = veCustomerInfoLs
                });
                return funRs;
            }

            return View(GetPageModel().ResultValue);
        }

        [HttpGet]
        [Authorize()]
        public IActionResult _GetCarNoInfoModel(Guid carGUID = default)
        {
            var funcMapper = _mapperHelper.GetMapperOfOnlineInfo<CustomerCar, PageCustomer_GetCarNoInfoModel>();

            var isNewOpen = carGUID == default;
            var pageModel = funcMapper.Map<PageCustomer_GetCarNoInfoModel>(isNewOpen ?
                new CustomerCar() :
                _customerService.GetCustomerCar(carGUID).FirstOrDefault());
            pageModel.IsNewOpen = isNewOpen;
            pageModel.ActionTypeName = isNewOpen ? "建立" : "編輯";

            return PartialView("_GetCarNoInfoModel", pageModel);
        }

        [HttpPost]
        [Authorize()]
        public IActionResult CreateCarNoInfo(PageCreateCarNoInfo pageModel)
        {
            //var validator = new VM_PurchaseWeightNoteValidator();
            //var validRs = validator.Validate(vmPurchaseWeightNote);

            //var validRs = validator.Validate(vmPurchaseWeightNote, options => options.IncludeRuleSets("Create"));


            // Action variables
            var errMsg = "";

            // Step Functions 
            #region -- ValidPageModel --
            FunctionResult ValidPageModel()
            {
                if (!ModelState.IsValid)
                    errMsg = $"資料驗證失敗，請檢查頁面訊息!!";
                var funRs = new FunctionResult();
                funRs.ResultSuccess("");
                return funRs;     // Return Result
            }
            #endregion
            #region -- CreateCarNoInfo --
            FunctionResult<CustomerCar> CreateCarNoInfo(PageCreateCarNoInfo pageModel)
            {
                var mapperCfgOfCustomerCar = _mapperHelper.GetMapperOfCreateCarNoInfo<PageCreateCarNoInfo, CustomerCar>();
                var customerCar = mapperCfgOfCustomerCar.Map<CustomerCar>(pageModel);
                // var funcRs = _customerService.UpdateCustomerInfo(customerInfo, _userManager.GetUserAsync(User).Result); 
                var funcRs = new FunctionResult<CustomerCar>();
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



            TempData["pageMsg"] = $@"建立成功!!";
            return RedirectToAction("OnlineInfo");
        }
    }
}
