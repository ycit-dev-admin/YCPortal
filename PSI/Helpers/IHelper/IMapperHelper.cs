using AutoMapper;

namespace PSI.Service.IHelper
{
    public interface IMapperHelper
    {

        public TargetType MapTo<SourceType, TargetType>(SourceType srcData, int mapType = 0)
           where SourceType : class
           where TargetType : class;

    }
}
