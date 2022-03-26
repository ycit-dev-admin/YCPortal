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
    public class CarNoController : Controller
    {
        private readonly ICustomerService _customerService;
        private readonly IPsiService _psiService;
        private readonly UserManager<AppUser> _userManager;
        private readonly SysConfigMapperHelper _mapperHelper;


        public CarNoController(ICustomerService customerService,
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


            /* Local Step Functions */
            FunctionResult<PageCarNoOnlineInfo> GetPageModel()
            {
                var cfgMapper = _mapperHelper.GetShowCustomerInfoMapper<CustomerInfo, Show_CustomerInfo>();
                var customerInfoLs = _customerService.GetCustomerInfos();
                var showCustomerInfoLs = cfgMapper.Map<List<Show_CustomerInfo>>(customerInfoLs);

                var funRs = new FunctionResult<PageCarNoOnlineInfo>();
                funRs.ResultSuccess("", new PageCarNoOnlineInfo
                {
                    CustomerInfoLs = showCustomerInfoLs
                });
                return funRs;
            }



            return View(GetPageModel().ResultValue);


        }


    }
}
