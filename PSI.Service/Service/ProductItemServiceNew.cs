using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Enums;
using PSI.Core.Extensions;
using PSI.Core.Helpers;
using PSI.Core.Interfaces.Repository;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Core.Models.DTOModels;
using PSI.Service.IMapperProfile;
using PSI.Service.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PSI.Service.Service
{
    public class ProductItemServiceNew : GenericService<ProductItem>, IProductItemServiceNew
    {
        private readonly IUnitOfWork _unitOfwork;
        private readonly IMapper _iMapper;
        //private readonly IEntityMapperProfile _iEntityMapperProfile;

        public ProductItemServiceNew(IUnitOfWork unitOfWork
            , IMapper iMapper)
         : base(unitOfWork, iMapper)
        {
            _unitOfWork = unitOfWork;
            _iMapper = iMapper;
            //_iEntityMapperProfile = iEntityMapperProfile;
        }

        public List<DTO_ProductItem> GetDTOSalesProductItems()
        {
            var needPsiTypes = PSIEnum.GetSalesPsiTypes()
                .Select(aa => (int)aa)
                .ToList();

            return this.GetDTOModels<DTO_ProductItem>(aa => needPsiTypes.Contains(aa.PSI_TYPE.Value) &&
                                     aa.IS_EFFECTIVE == "1");
        }

    }
}
