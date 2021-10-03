using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PSI.Areas.SysConfig.Infrastructure.Extensions.VM_Model;
using PSI.Areas.SysConfig.Models;

namespace PSI.Areas.SysConfig.Controllers
{
    [Area("SysConfig")]
    public class CustomerController : Controller
    {
        [HttpGet]
        public IActionResult CustomerInfo()
        {
            var pageModel = new List<VM_Customer_Info>();
            return View(pageModel);
        }

        [HttpGet]
        public IActionResult CreateCustomerInfo()
        {
            var pageModel = new VM_Customer_Info().IniPageModel();

            return View(pageModel);
        }

        [HttpPost]
        public IActionResult CreateCustomerInfo(VM_Customer_Info pageModel)
        {
            return RedirectToAction("CustomerInfo");
            //return View(pageModel);
        }
    }
}
