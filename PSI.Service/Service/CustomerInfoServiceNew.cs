using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Enums;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Core.Models.DTOModels;
using PSI.Service.IMapperProfile;
using PSI.Service.IService;

namespace PSI.Service.Service
{
    public class CustomerInfoServiceNew : GenericService<CustomerInfo>, ICustomerInfoServiceNew
    {
        private readonly IUnitOfWork _unitOfwork;
        private readonly IMapper _iMapper;
        // private readonly IEntityMapperProfile _iEntityMapperProfile;

        public CustomerInfoServiceNew(IUnitOfWork unitOfWork,
            IMapper iMapper
            //IEntityMapperProfile iEntityMapperProfile
            )
         : base(unitOfWork, iMapper)
        {
            //_iEntityMapperProfile = iEntityMapperProfile;
            _unitOfWork = unitOfWork;
            _iMapper = iMapper;

        }

        public List<DTO_CustomerInfo> GetDTOSalesCustomerInfo()
        {
            var salesTypes = PSIEnum.GetSalesPsiTypes().Select(aa => (int)aa).ToList();

            var dtoRs = this.GetDTOModels<DTO_CustomerInfo>(aa => aa.IS_EFFECTIVE == "1" &&
                    salesTypes.Contains(aa.PSI_TYPE.Value));
            //var dtoRs = this.GetDTOModels<DTO_CustomerInfo>(aa => aa.IS_EFFECTIVE == "1" &&
            //       salesTypes.Any(bb => bb == aa.PSI_TYPE));
            //var dtoRs = this.GetDTOModels<DTO_CustomerInfo>(aa => aa.IS_EFFECTIVE == "1");

            return dtoRs;
        }
    }
}
