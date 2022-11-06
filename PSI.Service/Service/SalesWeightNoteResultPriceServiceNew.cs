using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Service.IService;

namespace PSI.Service.Service
{
    public class SalesWeightNoteResultPriceServiceNew : GenericService<SalesWeightNoteStepData>, ISalesWeightNoteStepDataService
    {
        private readonly IUnitOfWork _unitOfwork;
        private readonly IMapper _iMapper;
        //private readonly IEntityMapperProfile _iEntityMapperProfile;

        public SalesWeightNoteResultPriceServiceNew(IUnitOfWork unitOfWork
            , IMapper iMapper
            //, IEntityMapperProfile iEntityMapperProfile
            )
         : base(unitOfWork, iMapper)
        {
            _unitOfWork = unitOfWork;
            _iMapper = iMapper;
            //_iEntityMapperProfile = iEntityMapperProfile;
        }


    }
}
