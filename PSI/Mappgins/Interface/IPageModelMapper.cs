using System;
using System.Collections.Generic;
using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Models.PageModels.Areas.Sales;
using PSI.Models.PEModels;

namespace PSI.Mappgins.Interface
{
    public interface IPageModelMapper  // IEntityMapper  IPageModelMapper IPEModelMapper
    {
        //T GetModel<T>(SalesWeightNote salesWeightNote)
        //   where T : WeightNoteUpdateActualData;

        T2 MapTo<T1, T2>(S_WeightNote salesWeightNote = null)
            where T1 : S_WeightNote
            where T2 : WeightNoteUpdateActualData;

        IMapper GetMapper<T1, T2>(S_WeightNote salesWeightNote = null)
           where T1 : S_WeightNote
           where T2 : WeightNoteUpdateActualData;

        IMapper GetMapper<T1>(S_WeightNote salesWeightNote = null, WeightNoteUpdateActualData weightNoteUpdateActualData = null)
          where T1 : S_WeightNote;
        //T2 MapTo<T1, T2>(SalesIngredient salesWeightNote = null)
        //   where T1 : SalesWeightNote
        //   where T2 : WeightNoteUpdateActualData;






        //List<T> MapTo<T>(List<SalesWeightNote> salesWeightNote) where T : WeightNoteUpdateActualData;
        // WeightNoteUpdateActualData MapTo<T>(SalesIngredient salesWeightNote) where T : WeightNoteUpdateActualData;
        //WeightNoteUpdateActualData GetWeightNoteUpdateActualDataPModel<T>(WeightNoteUpdateActualData salesWeightNote) where T : WeightNoteUpdateActualData;


    }
}
