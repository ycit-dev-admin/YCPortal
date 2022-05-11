using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PSI.Core.Entities;
using PSI.Service.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PSI.Controllers
{
    public class HomeController : Controller
    {

        

        public HomeController()
        {
            
        }

        //[FormValidator]
        [Authorize()]
        public IActionResult Index()
        {
            ViewData["Title"] = "首頁";
            return View();
        }

        

        
    }
}
