using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Models.PageModels.Areas.Sales;

namespace PSI.Mappgins.Interface
{
    public interface IPESalesWeightNoteMapper // IEntityMapper  IPageModelMapper IPEModelMapper
    {
        IMapper SalesWeightNoteQueryList<T>() where T : S_WeightNote;
        IMapper SalesWeightNoteActualDataUpdate<T>() where T : S_WeightNote;
        IMapper GetUpdateActualDataMapper<T>() where T : S_WeightNote;
        //T MapTo<T>(SalesWeightNote salesWeightNote) where T : WeightNoteUpdateActualData;
        //IMapper GetMapper<T1, T2>() where T1 : SalesWeightNote where T2 : WeightNoteUpdateActualData;


        //T MapTo<T>(T salesWeightNote) where T : WeightNoteUpdateActualData;

        //T2 MapTo<T1, T2>(T1 salesWeightNote)
        //    where T1 : SalesWeightNote
        //    where T2 : WeightNoteUpdateActualData;

        //List<T> MapTo<T>(List<SalesWeightNote> salesWeightNote) where T : WeightNoteUpdateActualData;
        // WeightNoteUpdateActualData MapTo<T>(SalesIngredient salesWeightNote) where T : WeightNoteUpdateActualData;
        //WeightNoteUpdateActualData GetWeightNoteUpdateActualDataPModel<T>(WeightNoteUpdateActualData salesWeightNote) where T : WeightNoteUpdateActualData;


    }
}
