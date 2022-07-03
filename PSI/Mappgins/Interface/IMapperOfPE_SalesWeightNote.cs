using AutoMapper;
using PSI.Core.Entities;

namespace PSI.Mappgins.Interface
{
    public interface IMapperOfPE_SalesWeightNote
    {
        IMapper SalesWeightNoteQueryList<T>() where T : SalesWeightNote;
    }
}
