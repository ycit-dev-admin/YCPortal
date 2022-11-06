using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Enums;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Core.Models.DTOModels;
using PSI.Service.IService;

namespace PSI.Service.Service
{
    public class CustomerContractServiceNew : GenericService<CustomerContract>, ICustomerContractServiceNew
    {
        private readonly IUnitOfWork _unitOfwork;
        private readonly IMapper _iMapper;


        public CustomerContractServiceNew(IUnitOfWork unitOfWork,
             IMapper iMapper
             )
          : base(unitOfWork, iMapper)
        {
            _unitOfWork = unitOfWork;
            _iMapper = iMapper;

        }

        public List<DTO_CustomerContract> GetSalesCustomerContracts()
        {
            var needStatus = CustomerContractEnum.GetContracOngoStatus()
                                                 .Select(aa => (int)aa).ToList();
            var needContractTypes = CustomerContractEnum.GetSaleContractTypes()
                                                        .Select(aa => (int)aa).ToList();

            return this.GetDTOModels<DTO_CustomerContract>(aa => needStatus.Contains(aa.CONTRACT_STATUS) &&
                                                     needContractTypes.Contains(aa.CONTRACT_TYPE));
        }
    }
}
