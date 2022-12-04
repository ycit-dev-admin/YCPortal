using System;
using AutoMapper;

namespace PSI.Service.IHelper
{
    public interface IMapperConfig
    {

        public IMapper GetMapConfig(int mapType = 0);

    }
}
