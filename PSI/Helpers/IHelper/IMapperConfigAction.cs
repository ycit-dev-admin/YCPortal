using AutoMapper;
using System;
using System.Collections.Generic;

namespace PSI.Helpers.IHelper
{
    public interface IMapperConfigAction
    {
        Dictionary<(Type, Type, int), IMapper> GetConfigDic();





    }
}
