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
    public class CustomerContractEnumService : ICustomerContractEnumService
    {
        private readonly IUnitOfWork _unitOfwork;
        private readonly IGenericRepository<ProductItem> _productItemRepository;

        public CustomerContractEnumService(IUnitOfWork unitOfWork)
        {
            _unitOfwork = unitOfWork;
            _productItemRepository = _unitOfwork.ProductItemRepository;
        }

        public IQueryable<CustomerContractEnum.Types> GetPurchaseContractTypes()
        {

            return new[] { CustomerContractEnum.Types.Purchase }.AsQueryable();

            //var(CustomerContractEnum.Status)aa.CONTRACT_STATU;

            //var abc = needStatus.Select(aa =>)
            //return typeof(CustomerContractEnum.Types).GetAllFieldInfo()
            //    .Where(fieldInfo => CustomerContractEnum.Types).Select(item =>           
        }
        public IQueryable<CustomerContractEnum.Types> GetSaleContractTypes()
        {

            return new[] { CustomerContractEnum.Types.Sale }.AsQueryable();

            //var(CustomerContractEnum.Status)aa.CONTRACT_STATU;

            //var abc = needStatus.Select(aa =>)
            //return typeof(CustomerContractEnum.Types).GetAllFieldInfo()
            //    .Where(fieldInfo => CustomerContractEnum.Types).Select(item =>
            // item.GetRawConstantValue().ToString()).AsQueryable();
        }// item.GetRawConstantValue().ToString()).AsQueryable();

        public IQueryable<CustomerContractEnum.Types> GetAllContracTypes()
        {
            return Enum.GetValues(typeof(CustomerContractEnum.Types))
                       .Cast<CustomerContractEnum.Types>().AsQueryable();
        }

        public IQueryable<CustomerContractEnum.Status> GetAllContracStatus()
        {
            return Enum.GetValues(typeof(CustomerContractEnum.Status))
                       .Cast<CustomerContractEnum.Status>().AsQueryable();
        }
        public IQueryable<CustomerContractEnum.Status> GetContracOngoStatus()
        {
            return new[] { CustomerContractEnum.Status.Ongoing }.AsQueryable();
        }
    }
}
