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
    public class CodeTableServiceNew : GenericService<CodeTable>, ICodeTableServiceNew
    {
        private readonly IUnitOfWork _unitOfwork;
        private readonly IMapper _iMapper;
        //private readonly IEntityMapperProfile _iEntityMapperProfile;

        public CodeTableServiceNew(IUnitOfWork unitOfWork,
            IMapper iMapper
            //,IEntityMapperProfile iEntityMapperProfile
            )
         : base(unitOfWork, iMapper)
        {
            _unitOfWork = unitOfWork;
            //_iEntityMapperProfile = iEntityMapperProfile;
            _iMapper = iMapper;
        }

        public List<DTO_CodeTable> GetPayTypeItems()
        {
            return this.GetDTOModels<DTO_CodeTable>(aa => aa.CODE_GROUP == "PAY_TYPE" &&
                              aa.IS_EFFECTIVE == "1");
        }

        public List<DTO_CodeTable> GetReceivedTypeItems()
        {
            return this.GetDTOModels<DTO_CodeTable>(aa => aa.CODE_GROUP == "RECEIVED_TYPE" &&
                             aa.IS_EFFECTIVE == "1");
        }
    }
}
