using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;

namespace PSI.Service.IMapperProfile
{
    public interface IEntityMapperProfile
    {

        IMapper GetIMapper<TEntity, DTOModel>();
    }
}
