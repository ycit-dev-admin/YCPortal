using System;
using System.Linq;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PSI.Areas.SysConfig.Infrastructure.Extensions.VM_Model;
using PSI.Areas.SysConfig.Models;
using PSI.Core.Entities;
using PSI.Service.IService;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace PSI.Areas.SysConfig.Controllers
{
    [Area("SysConfig")]
    public class CustomerController : Controller
    {
        private readonly IMapper _mapper;
        private readonly ICustomerService _customerService;
        private readonly UserManager<IdentityUser> _userManager;
        public CustomerController(IMapper mapper,
                                  ICustomerService customerService,
                                  UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
            _mapper = mapper;
            _customerService = customerService;
        }
        [HttpGet]
        public async Task<IActionResult> OnlineInfoAsync()
        {
            var currentUser = this.User;
            bool isAdmin = currentUser.IsInRole("Admin");

            var abc = User.Identity.Name;
            var user = await _userManager.GetUserAsync(User);


            //var abc = new UserManager<User>();
            //var id = abc.GetUserId(User); // Get user id:
            //var name = abc.GetUserName(User); // Get user id:


            var customerInfoLs = _customerService.GetCustomerInfosAsync().Result;
            var vmCreateCustomerInfoLs = _mapper.Map<List<VM_Create_CustomerInfo>>(customerInfoLs);
            var pageModel = new VM_Custome_OnlineInfo
            {
                VM_Create_CustomerInfoLs = vmCreateCustomerInfoLs
            };






            return View(pageModel);
        }

        [HttpGet]
        public IActionResult CreateCustomerInfo()
        {
            var pageModel = new VM_Create_CustomerInfo();
            pageModel.SetPsiTypeItems();
            //var qq = _mapper.Map<CustomerInfo>(pageModel);

            return View(pageModel);
        }

        [HttpPost]
        public IActionResult CreateCustomerInfo(VM_Create_CustomerInfo pageModel)
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
                    return RedirectToAction("CustomerInfo");

                TempData["pageMsg"] = createRs.ActionMessage;
            }
            else
            {
                TempData["pageMsg"] = "欄位檢核異常";
            }

            pageModel.SetPsiTypeItems(pageModel.PsiType);

            return View(pageModel);
        }
    }
}
