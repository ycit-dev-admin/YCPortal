using AutoMapper;

namespace PSI.Helpers.IHelper
{
    public interface IMapperAllConfig
    {
        IMapper FindConfig<SourceType, TargetType>(int mapType = 0)
            where SourceType : class
            where TargetType : class;
    }
}
