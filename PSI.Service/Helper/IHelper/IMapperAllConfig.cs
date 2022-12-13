using AutoMapper;

namespace PSI.Service.Helper.IHelper
{
    public interface IMapperAllConfig
    {
        IMapper FindConfig<SourceType>(int mapType = 0)
            where SourceType : class;
    }
}
