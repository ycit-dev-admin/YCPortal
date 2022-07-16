using System;
using System.Collections.Generic;
using AutoMapper;
using PSI.Areas.Sales.Models.PageModels;
using PSI.Core.Entities;
using PSI.Models.PEModels;

namespace PSI.Mappgins.Interface
{
    public interface IPESalesWeightNoteMapper // IEntityMapper  IPageModelMapper IPEModelMapper
    {
        IMapper SalesWeightNoteQueryList<T>() where T : SalesWeightNote;
        IMapper SalesWeightNoteActualDataUpdate<T>() where T : SalesWeightNote;
        IMapper GetUpdateActualDataMapper<T>() where T : SalesWeightNote;
        T MapTo<T>(SalesWeightNote salesWeightNote) where T : WeightNoteUpdateActualData;
        IMapper GetMapper<T1, T2>() where T1 : SalesWeightNote where T2 : WeightNoteUpdateActualData;


        T MapTo<T>(T salesWeightNote) where T : WeightNoteUpdateActualData;

        T2 MapTo<T1, T2>(T1 salesWeightNote)
            where T1 : SalesWeightNote
            where T2 : WeightNoteUpdateActualData;

        //List<T> MapTo<T>(List<SalesWeightNote> salesWeightNote) where T : WeightNoteUpdateActualData;
        // WeightNoteUpdateActualData MapTo<T>(SalesIngredient salesWeightNote) where T : WeightNoteUpdateActualData;
        //WeightNoteUpdateActualData GetWeightNoteUpdateActualDataPModel<T>(WeightNoteUpdateActualData salesWeightNote) where T : WeightNoteUpdateActualData;


    }
}
