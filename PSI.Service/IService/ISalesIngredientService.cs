using System;
using System.Collections.Generic;
using System.Linq;
using PSI.Core.Entities;

namespace PSI.Service.IService
{
    public interface ISalesIngredientService
    {
        IQueryable<S_WeightNote_Ingredient> GetSalesIngredients(Guid weightNoteGUID);
        IQueryable<S_WeightNote_Ingredient> GetSalesIngredients(List<Guid> weightNoteGUIDs);


    }
}
