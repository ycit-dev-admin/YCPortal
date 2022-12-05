using System.Collections.Generic;

namespace PSI.Helpers.IHelper
{
    public interface IMapperHelper
    {

        TargetType MapTo<SourceType, TargetType>(SourceType srcData, int mapType = 0)
          where SourceType : class
         where TargetType : class;
        List<TargetType> MapTo<SourceType, TargetType>(List<SourceType> srcData, int mapType = 0)
         where SourceType : class
        where TargetType : class;
    }
}
