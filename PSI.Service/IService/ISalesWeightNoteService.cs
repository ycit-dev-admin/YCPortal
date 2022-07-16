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
        IQueryable<SalesWeightNote> GetOngoSalesWeightDocs();
        SalesWeightNote GetSalesWeightNote(Guid unid);

        FunctionResult<SalesWeightNote> CreateSalesWeightNote(SalesWeightNote salesWeightNote,
         List<SalesIngredient> purchaseIngredientList,
         SalesWeightNoteResultPrice salesWeightNoteResultPrice,
         string docNo,
         AppUser operUserInfo);
    }
}
