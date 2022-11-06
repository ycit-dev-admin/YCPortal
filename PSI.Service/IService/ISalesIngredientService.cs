using System;
using System.Collections.Generic;
using System.Linq;
using PSI.Core.Entities;

namespace PSI.Service.IService
{
    public interface ISalesIngredientService
    {
        IQueryable<SalesIngredient> GetSalesIngredients(Guid weightNoteGUID);
        IQueryable<SalesIngredient> GetSalesIngredients(List<Guid> weightNoteGUIDs);


    }
}
