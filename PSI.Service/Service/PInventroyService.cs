using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Service.IService;

namespace PSI.Service.Service
{
    public class PInventroyService : GenericService<P_Inventory>
    {
        private readonly IUnitOfWork _unitOfwork;
        //private readonly IEntityMapperProfile _iEntityMapperProfile;
        private readonly IMapper _iMapper;



        public PInventroyService(IUnitOfWork unitOfWork
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
