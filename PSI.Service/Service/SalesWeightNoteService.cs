using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Enums;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Core.Models.DTOModels;
using PSI.Service.IMapperProfile;
using PSI.Service.IService;

namespace PSI.Service.Service
{
    public class SalesWeightNoteService : GenericService<SalesWeightNote>, ISalesWeightNoteService
    {
        private readonly IUnitOfWork _unitOfwork;
        private readonly IMapper _iMapper;

        public SalesWeightNoteService(IUnitOfWork unitOfWork,
            IMapper iMapper)
         : base(unitOfWork, iMapper)
        {
            _unitOfWork = unitOfWork;
            _iMapper = iMapper;
            //_iEntityMapperProfile = iEntityMapperProfile;
        }

        public List<DTO_SalesWeightNote> GetDTOOngoSalesWeightDocs()
        {
            var needStatus = PSIWeightNoteEnum.GetOngoSalesWeightDocStatus()
               .Select(aa => (int)aa).ToList();
            return this.GetDTOModels<DTO_SalesWeightNote>(aa => needStatus.Contains(aa.NOTE_STATUS));
        }
    }
}
