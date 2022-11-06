using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Enums;
using PSI.Core.Extensions;
using PSI.Core.Helpers;
using PSI.Core.Interfaces.Repository;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Service.IMapperProfile;
using PSI.Service.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PSI.Service.Service
{
    public class SalesIngredientServiceNew : GenericService<SalesIngredient>, ISalesIngredientServiceNew
    {
        private readonly IUnitOfWork _unitOfwork;
        //private readonly IEntityMapperProfile _iEntityMapperProfile;
        private readonly IMapper _iMapper;



        public SalesIngredientServiceNew(IUnitOfWork unitOfWork
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
