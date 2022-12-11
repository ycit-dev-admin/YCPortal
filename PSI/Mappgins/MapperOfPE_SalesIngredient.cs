using AutoMapper;
using PSI.Core.Entities;
using PSI.Mappgins.Interface;
using PSI.Models.PEModels;

namespace PSI.Mappgins
{
    public class MapperOfPE_SalesIngredient : IMapperOfPE_SalesIngredient
    {


        public MapperOfPE_SalesIngredient()
        {

        }

        public IMapper SalesWeightNoteQueryList<T>()
        {
            return new MapperConfiguration(cfg =>
            cfg.CreateMap<S_WeightNote_Ingredient, PE_SalesIngredient>()
            ).CreateMapper();

        }
    }
}
