using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Extensions;
using PSI.Core.Helpers;
using PSI.Core.Interfaces.Repository;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Service.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PSI.Service.Service
{
    public class ProductItemService : IProductItemService
    {
        private readonly IUnitOfWork _unitOfwork;
        private readonly IGenericRepository<ProductItem> _productItemRepository;

        public ProductItemService(IUnitOfWork unitOfWork)
        {
            _unitOfwork = unitOfWork;
            _productItemRepository = _unitOfwork.ProductItemRepository;
        }




        public IQueryable<ProductItem> GetPurchaseProductItems()
        {
            var needPsiTypes = new[] { "1", "3" };
            return _productItemRepository.GetAllAsync().Result.
                          Where(aa => needPsiTypes.Contains(aa.PSI_TYPE) &&
                                      aa.IS_EFFECTIVE == "1").AsQueryable();
        }
        public IQueryable<ProductItem> GetAllProductItems()
        {
            return _productItemRepository.GetAllAsync().Result.
                          Where(aa => aa.IS_EFFECTIVE == "1").AsQueryable();
        }

        public ProductItem GetProductItem(Guid productUNID)
        {
            return _productItemRepository.GetAsync(aa => aa.PRODUCT_UNID == productUNID).Result;
        }
        public ProductItem GetProductItem(string productName)
        {
            return _productItemRepository.GetAsync(aa => aa.PRODUCT_NAME == productName).Result;
        }

        public FunctionResult<ProductItem> CreateProductItem(ProductItem productItem, AppUser operUser)
        {
            // var curUserInfo = _userManager.GetUserAsync(_httpContextAccessor.HttpContext?.User).Result;
            var funcRs = new FunctionResult<ProductItem>(this);
            if (productItem != null)
            {
                productItem.PRODUCT_UNID = Guid.NewGuid();
                productItem.CREATE_EMPNO = operUser.NICK_NAME;
                productItem.CREATE_TIME = DateTime.Now;
                productItem.UPDATE_EMPNO = operUser.NICK_NAME;
                productItem.UPDATE_TIME = DateTime.Now;
                productItem.IS_EFFECTIVE = "1";
                productItem.PRODUCT_NAME = productItem.PRODUCT_NAME.ToUpper();

                var createRs = _productItemRepository.Create(productItem);

                if (!createRs.Success)
                {
                    funcRs.ResultFailure(createRs.ActionMessage);
                    return funcRs;
                }

                funcRs.ResultSuccess("新增客戶資料成功!!", productItem);
            }
            else
            {
                funcRs.ResultFailure("無客戶資料可新增!!");
            }
            return funcRs;
        }

        public FunctionResult<ProductItem> UpdateProductItem(ProductItem sourceEntity, AppUser operUser)
        {
            // var curUserInfo = _userManager.GetUserAsync(_httpContextAccessor.HttpContext?.User).Result;
            var funcRs = new FunctionResult<ProductItem>(this);
            if (sourceEntity != null)
            {
                sourceEntity.UPDATE_EMPNO = operUser.NICK_NAME;
                sourceEntity.UPDATE_TIME = DateTime.Now;

                var dbEntity = _productItemRepository.GetAsync(
                    aa => aa.PRODUCT_UNID == sourceEntity.PRODUCT_UNID).Result;
                var upDbEntity = typeof(ProductItem).ToUpdateEntityByNoNeed(
                    sourceEntity,
                    dbEntity,
                    new List<string> { nameof(ProductItem.ID),
                            nameof(ProductItem.PRODUCT_UNID),
                            nameof(ProductItem.CREATE_TIME),
                            nameof(ProductItem.CREATE_EMPNO)
                    });


                var updateRs = _productItemRepository.Update(upDbEntity);

                if (!updateRs.Success)
                {
                    funcRs.ResultFailure(updateRs.ActionMessage);
                    return funcRs;
                }

                funcRs.ResultSuccess("更新品項資料成功!!", upDbEntity);
            }
            else
            {
                funcRs.ResultFailure("無品項資料可新增!!");
            }
            return funcRs;
        }
    }
}
