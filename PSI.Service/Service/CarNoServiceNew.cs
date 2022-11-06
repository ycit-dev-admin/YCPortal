using System;
using System.Collections.Generic;
using System.Linq;
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

namespace PSI.Service.Service
{
    public class CarNoServiceNew : GenericService<CustomerCar>, ICarNoServiceNew
    {

        private readonly IUnitOfWork _unitOfwork;
        private readonly IMapper _iMapper;

        public CarNoServiceNew(IUnitOfWork unitOfWork,
            IMapper iMapper)
         : base(unitOfWork, iMapper)
        {
            _unitOfWork = unitOfWork;
            _iMapper = iMapper;
            //_iEntityMapperProfile = iEntityMapperProfile;
        }

        public List<DTO_CustomerCar> GetDTOSalesCustomerCar()
        {
            var salesStatus = PSIEnum.GetSalesPsiTypes()
                .Select(aa => (int)aa)
                .ToList();

            return this.GetDTOModels<DTO_CustomerCar>(aa => salesStatus.Contains(aa.CAR_NO_TYPE) &&
                               aa.IS_EFFECTIVE == "1");
        }

    }
}
