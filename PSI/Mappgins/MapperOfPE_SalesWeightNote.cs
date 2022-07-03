using AutoMapper;
using PSI.Core.Entities;
using PSI.Mappgins.Interface;
using PSI.Models.PEModels;

namespace PSI.Mappgins
{
    public class MapperOfPE_SalesWeightNote : IMapperOfPE_SalesWeightNote
    {


        public MapperOfPE_SalesWeightNote()
        {

        }

        public IMapper SalesWeightNoteQueryList<T>() where T : SalesWeightNote
        {
            return new MapperConfiguration(cfg =>
            cfg.CreateMap<SalesWeightNote, PE_SalesWeightNote>()
            ).CreateMapper();

        }
    }
}
