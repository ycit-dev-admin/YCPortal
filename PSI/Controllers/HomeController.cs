using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PSI.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            ViewData["Title"] = "Index";
            return View();
        }

        [HttpGet]
        public IActionResult CreatePDoc()
        {            
            return PartialView("_CreatePurchaseDocPartial");
        }
    }
}
