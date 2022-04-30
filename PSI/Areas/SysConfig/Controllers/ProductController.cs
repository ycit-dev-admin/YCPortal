using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
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
using PSI.Infrastructure.Extensions;
using PSI.Infrastructure.Helpers;
using PSI.Models.VEModels;
using PSI.Service.IService;

namespace PSI.Areas.SysConfig.Controllers
{
    [Area("SysConfig")]
    public class ProductController : Controller
    {
        private readonly ICustomerService _customerService;
        private readonly IProductItemService _productItemService;

        private readonly IPsiService _psiService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly ProductControllerMapper _mapperHelper;


        public ProductController(ICustomerService customerService,
                                  IProductItemService productItemService,
                                  IPsiService psiService,
                                  UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _customerService = customerService;
            _productItemService = productItemService;
            _psiService = psiService;
            _mapperHelper = new ProductControllerMapper();
        }
        [HttpGet]
        [Authorize()]
        public IActionResult OnlineInfo()
        {
            var errMsg = "";
            /* Local Step Functions */
            FunctionResult<PageProductOnlineInfo> GetPageModel()
            {
                var productItemMapper = _mapperHelper.GetMapperOfOnlineInfo<ProductItem, VE_ProductItem>();
                var productItemList = _productItemService.GetAllProductItems();
                var veProductItemList = productItemMapper.Map<List<VE_ProductItem>>(productItemList);
                //var customerMapper = _mapperHelper.GetMapperOfOnlineInfo<CustomerInfo, VE_CustomerInfo>();
                //var customerInfoLs = _customerService.GetCustomerInfos();
                //var veCustomerInfoLs = customerMapper.Map<List<VE_CustomerInfo>>(customerInfoLs);



                var funRs = new FunctionResult<PageProductOnlineInfo>();
                funRs.ResultSuccess("", new PageProductOnlineInfo
                {
                    VeProductItemList = veProductItemList,
                    PsiTypeItems = _psiService.GetPsiTypeItems()
                    .ToPageSelectList(nameof(CodeTable.CODE_TEXT), nameof(CodeTable.CODE_VALUE))
                    //CustomerCarLs = veCustomerCarLs,
                    //CustomerInfoLs = veCustomerInfoLs
                });
                return funRs;
            }

            return View(GetPageModel().ResultValue);
        }


        [HttpGet]
        [Authorize()]
        public IActionResult _GetProductItemModel(Guid prodUNID = default, bool isOnlyQuery = false)
        {

            // Action variables
            var errMsg = "";

            // Step Functions 
            #region -- GetPageModel --
            FunctionResult<SysConfigProduct_GetProductItemModel> GetPageModel(Guid prodUNID)
            {
                // Make mapper
                var pageModelMapper = _mapperHelper.GetMapperOf_GetProductItemModel<ProductItem, SysConfigProduct_GetProductItemModel>();

                // Set page model value
                var isNewOpen = prodUNID == default;
                var pageModel = pageModelMapper.Map<SysConfigProduct_GetProductItemModel>(isNewOpen ?
                    new ProductItem() :
                    _productItemService.GetProductItem(prodUNID));
                pageModel.IsNewOpen = isNewOpen;
                pageModel.IsOnlyQuery = isOnlyQuery;
                pageModel.ActionTypeName = isOnlyQuery ? "查詢" :
                                           isNewOpen ? "建立" : "編輯";
                pageModel.FormActionName = isNewOpen ?
                    nameof(this.CreateProductItem) :
                    "";
                // nameof(this.UpdateCarNoInfo);


                // Return Result
                var funRs = new FunctionResult<SysConfigProduct_GetProductItemModel>();
                funRs.ResultSuccess("", pageModel);
                return funRs;
            }
            #endregion



            // Step Result
            if (!GetPageModel(prodUNID).Success)
            {
                TempData["pageMsg"] = errMsg;
            }



            return PartialView("_GetCarNoInfoModel",
                GetPageModel(prodUNID).ResultValue);
        }


        [HttpPost]
        [Authorize()]
        public IActionResult CreateProductItem(SysConfigProductCreateProductItem pageModel)
        {
            // Action variables
            var errMsg = "";

            // Step Functions 
            #region -- ValidPageModel --
            FunctionResult ValidPageModel(SysConfigProductCreateProductItem pageModel)
            {
                var funRs = new FunctionResult();
                var validator = new SysConfigProductCreateProductItemValidator();
                var validRs = validator.Validate(pageModel);
                //var validRs = validator.Validate(pageModel, options => options.IncludeRuleSets("Create"));

                if (!validRs.IsValid)
                {
                    errMsg = $@"資料驗證失敗，請檢查頁面訊息!! 原因:{string.Join(',', validRs.Errors)}";
                    funRs.ResultFailure(errMsg);
                    return funRs;
                }

                var isDuplicate = _productItemService.GetProductItem(pageModel.ProductItemName) != null;
                if (isDuplicate)  // 檢核車牌有無重複
                {
                    errMsg = $@"資料驗證失敗!! 原因:{pageModel.ProductItemName} 為重複品項名稱";
                    funRs.ResultFailure(errMsg);
                    return funRs;
                }

                funRs.ResultSuccess("");
                return funRs;     // Return Result
            }
            #endregion
            #region -- CreateProductItem --
            FunctionResult<ProductItem> CreateProductItem(SysConfigProductCreateProductItem pageModel)
            {
                var productItemMapper = _mapperHelper.GetMapperOfCreateProductItem<SysConfigProductCreateProductItem, ProductItem>();
                var productItem = productItemMapper.Map<ProductItem>(pageModel);
                var funcRs = _productItemService.CreateProductItem(productItem, _userManager.GetUserAsync(User).Result);
                funcRs.ResultSuccess("ok", productItem);
                errMsg = funcRs.ErrorMessage;
                return funcRs;     // Return Result
            }
            #endregion


            // Step Result
            if (!ValidPageModel(pageModel).Success ||
                !CreateProductItem(pageModel).Success)
            {
                TempData["pageMsg"] = errMsg;
                return RedirectToAction("OnlineInfo");
            }


            // Successed
            //return View(pageModel);
            TempData["pageMsg"] = $@"車牌:{pageModel.ProductItemName} 建立成功!!";
            return RedirectToAction("OnlineInfo");
        }

    }
}
