using System;
using System.Collections.Generic;
using System.Linq;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Helpers;

namespace PSI.Service.IService
{
    public interface ISalesWeightNoteService
    {
        IQueryable<SalesWeightNote> GetSalesWeightNotes(List<Guid> unids);
        IQueryable<SalesWeightNote> SalesWeightNoteQueryList();

        FunctionResult<SalesWeightNote> SalesWeightNoteCreateWeightNote(SalesWeightNote salesWeightNote,
         List<SalesIngredient> purchaseIngredientList,
         SalesWeightNoteResultPrice salesWeightNoteResultPrice,
         string docNo,
         AppUser operUserInfo);
    }
}
