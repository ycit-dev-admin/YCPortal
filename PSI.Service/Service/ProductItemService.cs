using PSI.Core.Entities;
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


       

        public IEnumerable<ProductItem> GetPurchaseProductItems()
        {
            var needPsiTypes = new[] { "1", "3" };
            return _productItemRepository.GetAllAsync().Result.
                          Where(aa => needPsiTypes.Contains(aa.PsiType) &&
                                      aa.IsEffective == "1");
        }
    }
}
