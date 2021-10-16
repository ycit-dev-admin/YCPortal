using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PSI.Areas.SysConfig.Infrastructure.Extensions.VM_Model;
using PSI.Areas.SysConfig.Models;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Service.IService;

namespace PSI.Areas.SysConfig.Controllers
{
    [Area("SysConfig")]
    public class CustomerController : Controller
    {
        private readonly IMapper _mapper;
        private readonly ICustomerService _customerService;
        private readonly UserManager<AppUser> _userManager;
        public CustomerController(IMapper mapper,
                                  ICustomerService customerService,
                                  UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _mapper = mapper;
            _customerService = customerService;
        }
        [HttpGet]
        [Authorize()]
        public IActionResult OnlineInfo()
        {
            //var currentUser = this.User;
            //bool isAdmin = currentUser.IsInRole("Admin");           
            //var userInfo = await _userManager.GetUserAsync(User);


            //var abc = new UserManager<User>();
            //var id = abc.GetUserId(User); // Get user id:
            //var name = abc.GetUserName(User); // Get user id:


            var customerInfoLs = _customerService.GetCustomerInfos();
            var vmCustomerInfoLs = _mapper.Map<List<VM_CustomerInfo>>(customerInfoLs);




            var pageModel = new VM_Custome_OnlineInfo
            {
                VM_CustomerInfoLs = vmCustomerInfoLs
            };






            return View(pageModel);
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

            pageModel.SetPsiTypeItems(pageModel.PsiType);

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
            var customerInfo = _customerService.GetCustomerInfo(sn);
            var carNoLs = _customerService.GetCustomerCarBy(sn).Select(aa => aa.CarName);
            var pageModel = _mapper.Map<VM_CustomerInfo>(customerInfo);
            pageModel.PostCarNo = carNoLs.ToArray();
            pageModel.SetPsiTypeItems();


            return View(pageModel);
        }
    }
}
