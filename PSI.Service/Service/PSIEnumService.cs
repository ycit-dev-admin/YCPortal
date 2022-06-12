using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Enums;
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
    public class PSIEnumService : IPSIEnumService
    {
        private readonly IUnitOfWork _unitOfwork;
        private readonly IGenericRepository<ProductItem> _productItemRepository;

        public PSIEnumService(IUnitOfWork unitOfWork)
        {
            _unitOfwork = unitOfWork;
            _productItemRepository = _unitOfwork.ProductItemRepository;
        }

        public IQueryable<PSIEnum.PSIType> GetSalesPsiTypes()
        {
            var needsPsiTypes = new[] { PSIEnum.PSIType.Sale,
                PSIEnum.PSIType.Both,
                PSIEnum.PSIType.Inside};

            return Enum.GetValues(typeof(PSIEnum.PSIType))
                       .Cast<PSIEnum.PSIType>()
                       .Where(aa => needsPsiTypes.Contains(aa)).AsQueryable();
        }
        public IQueryable<PSIEnum.PSIType> GetPurchasePsiTypes()
        {
            return new[] { PSIEnum.PSIType.Purchase,
                PSIEnum.PSIType.Both }.AsQueryable();

            //return Enum.GetValues(typeof(PSIEnum.PSIType))
            //           .Cast<PSIEnum.PSIType>()
            //           .Where(aa => needsPsiTypes.Contains(aa)).AsQueryable();
        }

        public IQueryable<PSIEnum.PSIType> GetAllPsiTypes()
        {
            return Enum.GetValues(typeof(PSIEnum.PSIType))
                       .Cast<PSIEnum.PSIType>().AsQueryable();
        }
    }
}
