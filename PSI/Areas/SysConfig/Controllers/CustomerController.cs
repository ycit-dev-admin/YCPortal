using System;
using System.Linq;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PSI.Areas.SysConfig.Infrastructure.Extensions.VM_Model;
using PSI.Areas.SysConfig.Models;
using PSI.Core.Entities;
using PSI.Service.IService;

namespace PSI.Areas.SysConfig.Controllers
{
    [Area("SysConfig")]
    public class CustomerController : Controller
    {
        private IMapper _mapper;
        private ICustomerService _customerService;
        public CustomerController(IMapper mapper, ICustomerService customerService)
        {
            _mapper = mapper;
            _customerService = customerService;
        }
        [HttpGet]
        public IActionResult CustomerInfo()
        {
            var pageModel = new List<VM_Create_CustomerInfo>();
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
