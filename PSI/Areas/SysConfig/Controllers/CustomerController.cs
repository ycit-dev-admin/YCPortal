using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PSI.Areas.Purchase.Helpers;
using PSI.Areas.SysConfig.Infrastructure.Extensions.VM_Model;
using PSI.Areas.SysConfig.Models;
using PSI.Areas.SysConfig.Models.PageModels;
using PSI.Areas.SysConfig.Models.ShowModels;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Helpers;
using PSI.Infrastructure.Extensions;
using PSI.Service.IService;

namespace PSI.Areas.SysConfig.Controllers
{
    [Area("SysConfig")]
    public class CustomerController : Controller
    {
        private readonly ICustomerService _customerService;
        private readonly IPsiService _psiService;
        private readonly UserManager<AppUser> _userManager;
        private readonly SysConfigMapperHelper _mapperHelper;


        public CustomerController(ICustomerService customerService,
                                  IPsiService psiService,
                                  UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _customerService = customerService;
            _psiService = psiService;
            _mapperHelper = new SysConfigMapperHelper();
        }
        [HttpGet]
        [Authorize()]
        public IActionResult OnlineInfo()
        {
            var errMsg = "";
            //var currentUser = this.User;
            //bool isAdmin = currentUser.IsInRole("Admin");           
            //var userInfo = await _userManager.GetUserAsync(User);
            //var abc = new UserManager<User>();
            //var id = abc.GetUserId(User); // Get user id:
            //var name = abc.GetUserName(User); // Get user id:

            //if (!GetPageModel().Success ||
            //    !GetPageModel().Success)
            //    TempData["pageMsg"] = errMsg;

            return View(GetPageModel().ResultValue);


            /* Local Functions */
            FunctionResult<PageCustomerOnlineInfo> GetPageModel()
            {
                var cfgMapper = _mapperHelper.GetShowCustomerInfoMapper<CustomerInfo, Show_CustomerInfo>();
                var customerInfoLs = _customerService.GetCustomerInfos();
                var showCustomerInfoLs = cfgMapper.Map<List<Show_CustomerInfo>>(customerInfoLs);

                var funRs = new FunctionResult<PageCustomerOnlineInfo>();
                funRs.ResultSuccess("", new PageCustomerOnlineInfo
                {
                    CustomerInfoLs = showCustomerInfoLs
                });
                return funRs;
            }
        }

        [HttpGet]
        [Authorize()]
        public IActionResult CreateCustomerInfo()
        {
            var pageModel = new PageCustomerCreateCustomerInfo
            {
                PsiTypeItems = _psiService.GetPsiTypeItems()
                   .ToPageSelectList(nameof(CodeTable.CodeText), nameof(CodeTable.CodeValue))
            };
            return View(pageModel);
        }

        [HttpGet]
        [Authorize()]
        public IActionResult _GetCarNoInfoModel(Guid carGUID = default)
        {
            var funcMapper = _mapperHelper.GetPageCustomer_GetCarNoInfoModel<CustomerCar, PageCustomer_GetCarNoInfoModel>();

            var isNewOpen = carGUID == default;
            var pageModel = funcMapper.Map<PageCustomer_GetCarNoInfoModel>(isNewOpen ?
                new CustomerCar() :
                _customerService.GetCustomerCarBy(carGUID).FirstOrDefault());
            pageModel.ActionType = isNewOpen ? "建立" : "編輯";

            return PartialView("_GetCarNoInfoModel", pageModel);
        }

        [HttpPost]
        [Authorize()]
        public IActionResult CreateCustomerInfo(PageCustomerCreateCustomerInfo pageModel)
        {

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
            #region -- CreateToDB --
            FunctionResult<CustomerInfo> CreatDataToDB(PageCustomerCreateCustomerInfo pageModel)
            {
                var customerInfoCfgMapper = _mapperHelper.GetEntityCustomerInfo<PageCustomerCreateCustomerInfo, CustomerInfo>();
                var customerInfo = customerInfoCfgMapper.Map<CustomerInfo>(pageModel);
                var funcRs = _customerService.CreateCustomerInfo(customerInfo, new List<CustomerCar>(), _userManager.GetUserAsync(User).Result);
                errMsg = funcRs.ErrorMessage;
                return funcRs;     // Return Result
            }
            #endregion


            // Step Result
            if (!ValidPageModel().Success ||
                !CreatDataToDB(pageModel).Success)
            {
                TempData["pageMsg"] = errMsg;
                return View(pageModel);
            }


            // Successed
            return RedirectToAction("OnlineInfo");
        }

        [HttpGet]
        [Authorize()]
        public IActionResult EditCustomerInfo(Guid unid)
        {
            //var psiTypeLs = typeof(PSIEnum.PSIType).GetAllFieldInfo();
            //var haha = psiTypeLs.FirstOrDefault(aa => aa.Name == "");
            //var haha2 = ((PSIEnum.PSIType)0).GetDescription();
            //vmCreateCustomerInfoLs = vmCreateCustomerInfoLs.Select(item =>            {

            //    return item;
            //}).ToList();
            //item.PsiTypeName = int.TryParse(item.PsiType, out var cInt) ?
            //                     ((PSIEnum.PSIType)cInt).GetDescription() :
            //                     "無設定";
            // var customerInfo = _customerService.GetCustomerInfo(sn);
            // var carNoLs = _customerService.GetCustomerCarBy(sn).Select(aa => aa.CarName);
            // var pageModel = _mapper.Map<PageCustomerEditCustomerInfo>(customerInfo);
            // pageModel.CustomerCarList = _mapper.Map<List<Show_CustomerCar>>(_customerService.GetCustomerCarBy(sn).ToList());
            //pageModel.SetPsiTypeItems();  // 把Purchase Page Itme Helpr稿過來

            // Action variables
            var errMsg = "";

            // Step Functions 
            #region -- GetPageModel --
            FunctionResult<PageCustomerEditCustomerInfo> GetPageModel()
            {
                // Make Mapper
                var pModelCfgMapper = _mapperHelper.GetPageCustomerEditCustomerInfoMapper<CustomerInfo>();
                var cfgMapper = _mapperHelper.GetShowCustomerCarMapper<CustomerCar>();

                // Query Data
                var customerInfo = _customerService.GetCustomerInfo(unid);
                var showCustomerCarLs = _customerService.GetCustomerCarBy(unid).ToList();  // 要改成用Guid

                // Map to model
                var pageModel = pModelCfgMapper.Map<PageCustomerEditCustomerInfo>(customerInfo);
                pageModel.CustomerCarList = cfgMapper.Map<List<Show_CustomerCar>>(showCustomerCarLs);
                pageModel.PsiTypeItems = _psiService.GetPsiTypeItems()
                    .ToPageSelectList(nameof(CodeTable.CodeText), nameof(CodeTable.CodeValue));

                // Return Result
                var funRs = new FunctionResult<PageCustomerEditCustomerInfo>();
                funRs.ResultSuccess("", pageModel);
                return funRs;
            }
            #endregion


            // Step Result

            return View(GetPageModel().ResultValue);
        }

        [HttpPost]
        [Authorize()]
        public IActionResult EditCustomerInfo(PageCustomerEditCustomerInfo pageModel)
        {
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
            #region -- UpdateToDB --
            FunctionResult<CustomerInfo> UpdateToDB(PageCustomerEditCustomerInfo pageModel)
            {
                var customerInfoCfgMapper = _mapperHelper.GetEntityCustomerInfo<PageCustomerEditCustomerInfo, CustomerInfo>();
                var customerInfo = customerInfoCfgMapper.Map<CustomerInfo>(pageModel);
                var funcRs = _customerService.UpdateCustomerInfo(customerInfo, _userManager.GetUserAsync(User).Result);
                errMsg = funcRs.ErrorMessage;
                return funcRs;     // Return Result
            }
            #endregion


            // Step Result
            if (!ValidPageModel().Success ||
                !UpdateToDB(pageModel).Success)
            {
                TempData["pageMsg"] = errMsg;
                return View(pageModel);
            }


            // Successed
            return View(pageModel);





            //var validator = new VE_PurchaseWeightNoteValidator();
            //var validRs = validator.Validate(vmPurchaseWeightNote);

            //var validRs = validator.Validate(vmPurchaseWeightNote, options => options.IncludeRuleSets("Create"));


            //var psiTypeLs = typeof(PSIEnum.PSIType).GetAllFieldInfo();
            //var haha = psiTypeLs.FirstOrDefault(aa => aa.Name == "");
            //var haha2 = ((PSIEnum.PSIType)0).GetDescription();
            //vmCreateCustomerInfoLs = vmCreateCustomerInfoLs.Select(item =>            {

            //    return item;
            //}).ToList();
            //item.PsiTypeName = int.TryParse(item.PsiType, out var cInt) ?
            //                     ((PSIEnum.PSIType)cInt).GetDescription() :
            //                     "無設定";
            //var customerInfo = _customerService.GetCustomerInfo(sn);
            //var carNoLs = _customerService.GetCustomerCarBy(sn).Select(aa => aa.CarName);
            //var pageModel = _mapper.Map<PageCustomerEditCustomerInfo>(customerInfo);
            //pageModel.PostCarNo = carNoLs.ToArray();
            //pageModel.SetPsiTypeItems();



        }
    }
}
