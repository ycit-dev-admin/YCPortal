using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PSI.Areas.Purchase.Helpers;
using PSI.Areas.SysConfig.Mappers;
using PSI.Areas.SysConfig.Models;
using PSI.Areas.SysConfig.Models.PageModels;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Helpers;
using PSI.Models.VEModels;
using PSI.Service.IService;

namespace PSI.Areas.SysConfig.Controllers
{
    [Area("SysConfig")]
    public class CarNoController : Controller
    {
        private readonly ICustomerService _customerService;
        private readonly IPsiService _psiService;
        private readonly UserManager<AppUser> _userManager;
        private readonly CarNoControllerMapper _mapperHelper;


        public CarNoController(ICustomerService customerService,
                                  IPsiService psiService,
                                  UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _customerService = customerService;
            _psiService = psiService;
            _mapperHelper = new CarNoControllerMapper();
        }
        [HttpGet]
        [Authorize()]
        public IActionResult OnlineInfo()
        {
            var errMsg = "";
            /* Local Step Functions */
            FunctionResult<PageCarNoOnlineInfo> GetPageModel()
            {
                var customerCarLs = _customerService.GetCustomerCars();
                var cfgMapper = _mapperHelper.GetMapperOfOnlineInfo<CustomerCar, VE_CustomerCar>();
                var veCustomerInfoLs = cfgMapper.Map<List<VE_CustomerCar>>(customerCarLs);

                var funRs = new FunctionResult<PageCarNoOnlineInfo>();
                funRs.ResultSuccess("", new PageCarNoOnlineInfo
                {
                    CustomerCarInfoLs = veCustomerInfoLs
                });
                return funRs;
            }

            return View(GetPageModel().ResultValue);
        }

        [HttpGet]
        [Authorize()]
        public IActionResult _GetCarNoInfoModel(Guid carGUID = default)
        {
            var funcMapper = _mapperHelper.GetMapperOfOnlineInfo<CustomerCar, PageCustomer_GetCarNoInfoModel>();

            var isNewOpen = carGUID == default;
            var pageModel = funcMapper.Map<PageCustomer_GetCarNoInfoModel>(isNewOpen ?
                new CustomerCar() :
                _customerService.GetCustomerCar(carGUID).FirstOrDefault());
            pageModel.IsNewOpen = isNewOpen;
            pageModel.ActionTypeName = isNewOpen ? "建立" : "編輯";

            return PartialView("_GetCarNoInfoModel", pageModel);
        }
    }
}
