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
    public class CustomerController : Controller
    {
        private readonly ICustomerService _customerService;
        private readonly IPsiService _psiService;
        private readonly UserManager<AppUser> _userManager;
        private readonly CustomerControllerMapper _mapperHelper;


        public CustomerController(ICustomerService customerService,
                                  IPsiService psiService,
                                  UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _customerService = customerService;
            _psiService = psiService;
            _mapperHelper = new CustomerControllerMapper();
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


            /* Local Functions */
            FunctionResult<PageCustomerOnlineInfo> GetPageModel()
            {
                var veCustomerInfoMapper = _mapperHelper.GetMapperOfOnlineInfo<CustomerInfo, VE_CustomerInfo>();
                var customerInfoLs = _customerService.GetCustomerInfos();
                var veCustomerInfoLs = veCustomerInfoMapper.Map<List<VE_CustomerInfo>>(customerInfoLs);

                var veCustomerCarMapper = _mapperHelper.GetMapperOfOnlineInfo<CustomerCar, VE_CustomerCar>();
                var customerCarLs = _customerService.GetCustomerCars().Where(aa => aa.IS_EFFECTIVE == "1").ToList();
                var veCustomerCarLs = veCustomerCarMapper.Map<List<VE_CustomerCar>>(customerCarLs);

                var funRs = new FunctionResult<PageCustomerOnlineInfo>();
                funRs.ResultSuccess("", new PageCustomerOnlineInfo
                {
                    CustomerInfoLs = veCustomerInfoLs,
                    CustomerCarLs = veCustomerCarLs
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
                _customerService.GetCustomerCar(carGUID).FirstOrDefault());
            pageModel.IsNewOpen = isNewOpen;
            pageModel.ActionTypeName = isNewOpen ? "建立" : "編輯";

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
                var funRs = new FunctionResult();
                var validator = new PageCustomerCreateCustomerInfoValidator();
                var validRs = validator.Validate(pageModel);

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
            #region -- CreateToDB --
            FunctionResult<CustomerInfo> CreatDataToDB(PageCustomerCreateCustomerInfo pageModel)
            {
                var customerInfoCfgMapper = _mapperHelper.GetMapperOfCreateCustomerInfo<PageCustomerCreateCustomerInfo, CustomerInfo>();
                var customerInfo = customerInfoCfgMapper.Map<CustomerInfo>(pageModel);
                var funcRs = _customerService.CreateCustomerInfo(customerInfo, _userManager.GetUserAsync(User).Result);
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
            FunctionResult<PageCustomerEditCustomerInfo> GetPageModel(Guid unid)
            {
                // Make Mapper
                var pModelMapper = _mapperHelper.GetMapperOfEditCustomerInfo<CustomerInfo, PageCustomerEditCustomerInfo>();
                var veCustomerCarMapper = _mapperHelper.GetMapperOfEditCustomerInfo<CustomerCar, VE_CustomerCar>();

                // Query Data
                var customerInfo = _customerService.GetCustomerInfo(unid);
                var customerCarLs = _customerService.GetCustomerCar(unid).ToList();  // 要改成用Guid

                // Map to model
                var pageModel = pModelMapper.Map<PageCustomerEditCustomerInfo>(customerInfo);
                pageModel.VE_CustomerCarList = veCustomerCarMapper.Map<List<VE_CustomerCar>>(customerCarLs);
                pageModel.PsiTypeItems = _psiService.GetPsiTypeItems()
                    .ToPageSelectList(nameof(CodeTable.CodeText), nameof(CodeTable.CodeValue));

                // Return Result
                var funRs = new FunctionResult<PageCustomerEditCustomerInfo>();
                funRs.ResultSuccess("", pageModel);
                return funRs;
            }
            #endregion


            // Step Result

            return View(GetPageModel(unid).ResultValue);
        }

        [HttpPost]
        [Authorize()]
        public IActionResult EditCustomerInfo(PageCustomerEditCustomerInfo pageModel)
        {
            // Action variables
            var errMsg = "";
            CustomerInfo resultCustomerInfo;

            // Step Functions 
            #region -- ValidPageModel --
            FunctionResult ValidPageModel()
            {
                //if (!ModelState.IsValid)
                //    errMsg = $"資料驗證失敗，請檢查頁面訊息!!";
                //var funRs = new FunctionResult();
                //funRs.ResultSuccess("");
                //return funRs;     // Return Result



                var funRs = new FunctionResult();
                var validator = new PageCustomerEditCustomerInfoValidator();
                var validRs = validator.Validate(pageModel, options => options.IncludeRuleSets("Skip"));
                if (!validRs.IsValid)
                {
                    errMsg = $@"資料驗證失敗，請檢查頁面訊息!! 原因:{string.Join(',', validRs.Errors)}";
                    funRs.ResultFailure(errMsg);
                    return funRs;
                }

                var isCustomerNameDuplicate = _customerService.GetCustomerInfoByCustomerName(pageModel.EditCustomerName) != null;
                if (isCustomerNameDuplicate)  // 檢核客戶名稱有無重複
                {
                    errMsg = $@"資料驗證失敗!! 原因:{pageModel.EditCustomerName} 為重複客戶名稱";
                    funRs.ResultFailure(errMsg);
                    return funRs;
                }
                var isCompanyNameDuplicate = _customerService.GetCustomerInfoByCompanyName(pageModel.EditCompanyName) != null;
                if (isCompanyNameDuplicate)  // 檢核客戶名稱有無重複
                {
                    errMsg = $@"資料驗證失敗!! 原因:{pageModel.EditCompanyName} 為重複公司名稱";
                    funRs.ResultFailure(errMsg);
                    return funRs;
                }

                funRs.ResultSuccess("");
                return funRs;     // Return Result
            }
            #endregion
            #region -- UpdateToDB --
            FunctionResult<CustomerInfo> UpdateToDB(PageCustomerEditCustomerInfo pageModel)
            {
                var customerInfoMapper = _mapperHelper.GetMapperOfCustomerEditCustomerInfo<PageCustomerEditCustomerInfo, CustomerInfo>();
                var customerInfo = customerInfoMapper.Map<CustomerInfo>(pageModel);
                var funcRs = _customerService.UpdateCustomerInfo(customerInfo, _userManager.GetUserAsync(User).Result);
                errMsg = funcRs.ErrorMessage;
                resultCustomerInfo = funcRs.Success ? funcRs.ResultValue : null;
                return funcRs;     // Return Result
            }
            #endregion


            // Step Result
            if (!ValidPageModel().Success ||
                !UpdateToDB(pageModel).Success)
            {
                TempData["pageMsg"] = errMsg;
                var veCustomerCarMapper = _mapperHelper.GetMapperOfEditCustomerInfo<CustomerCar, VE_CustomerCar>();
                var customerCarLs = _customerService.GetCustomerCar(pageModel.CustomerGuid).ToList();  // 要改成用Guid
                pageModel.VE_CustomerCarList = veCustomerCarMapper.Map<List<VE_CustomerCar>>(customerCarLs);
                pageModel.PsiTypeItems = _psiService.GetPsiTypeItems()
                    .ToPageSelectList(nameof(CodeTable.CodeText), nameof(CodeTable.CodeValue));
                return View(pageModel);
            }


            // Successed
            TempData["pageMsg"] = $@"客戶:{resultCustomerInfo.CUSTOMER_NAME} 更新成功!!";
            return RedirectToAction("OnlineInfo");





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
