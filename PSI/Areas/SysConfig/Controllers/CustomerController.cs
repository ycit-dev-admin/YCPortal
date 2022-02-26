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
        private readonly IMapper _mapper;
        private readonly ICustomerService _customerService;
        private readonly IPsiService _psiService;
        private readonly UserManager<AppUser> _userManager;

        public CustomerController(IMapper mapper,
                                  ICustomerService customerService,
                                  IPsiService psiService,
                                  UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _mapper = mapper;
            _customerService = customerService;
            _psiService = psiService;
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
                var customerInfoLs = _customerService.GetCustomerInfos();
                var showCustomerInfoLs = _mapper.Map<List<Show_CustomerInfo>>(customerInfoLs);

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
            var pageModel = new VM_CustomerInfo();
            pageModel.SetPsiTypeItems();
            //var qq = _mapper.Map<CustomerInfo>(pageModel);

            return View(pageModel);
        }

        [HttpPost]
        [Authorize()]
        public IActionResult CreateCustomerInfo(VM_CustomerInfo pageModel)
        {
            if (ModelState.IsValid)
            {
                // 取得實體
                var cutomerInfo = _mapper.Map<CustomerInfo>(pageModel);
                var customerCarLs = pageModel.PostCarNo?.Select(carNo => new CustomerCar
                {
                    CarName = carNo
                }).ToList();
                // create curstomInfo and customerCarLs push into service 
                var createRs = _customerService.CreateCustomerInfo(cutomerInfo, customerCarLs);
                if (createRs.Success)
                    return RedirectToAction("OnlineInfo");

                TempData["pageMsg"] = createRs.ActionMessage;
            }
            else
            {
                TempData["pageMsg"] = "欄位檢核異常";
            }

            // pageModel.SetPsiTypeItems(pageModel.PsiType);

            return View(pageModel);
        }

        [HttpGet]
        [Authorize()]
        public IActionResult EditCustomerInfo(long sn)
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
                #region -- PageModelMapper --
                var cfgMapper1 = new MapperConfiguration(cfg =>
                cfg.CreateMap<CustomerInfo, PageCustomerEditCustomerInfo>()
               .ForMember(x => x.CompanyName, y => y.MapFrom(o => o.CompanyName))
               .ForMember(x => x.CustomerName, y => y.MapFrom(o => o.CustomerName))
               .ForMember(x => x.TaxId, y => y.MapFrom(o => o.TaxId))
               .ForMember(x => x.PsiType, y => y.MapFrom(o => o.PsiType))
               .ForMember(x => x.Remark, y => y.MapFrom(o => o.Remark))).CreateMapper();
                #endregion

                #region -- CustomerCarListMapper --
                var cfgMapper2 = new MapperConfiguration(cfg =>
                cfg.CreateMap<CustomerCar, Show_CustomerCar>()
               .ForMember(x => x.CustomerId, y => y.MapFrom(o => o.CustomerId))
               .ForMember(x => x.CarName, y => y.MapFrom(o => o.CarName))).CreateMapper();
                #endregion

                var customerInfo = _customerService.GetCustomerInfo(sn);
                var pageModel = cfgMapper1.Map<PageCustomerEditCustomerInfo>(customerInfo);
                pageModel.CustomerCarList = cfgMapper2.Map<List<Show_CustomerCar>>(_customerService.GetCustomerCarBy(sn).ToList());
                pageModel.PsiTypeItems = _psiService.GetPsiTypeItems()
                    .ToPageSelectList(nameof(CodeTable.CodeText), nameof(CodeTable.CodeValue));

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


            return View(pageModel);
        }
    }
}
