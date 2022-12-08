using System;
using System.Collections.Generic;
using System.Linq;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Helpers;

namespace PSI.Service.IService
{
    public interface ISalesWeightNoteServiceOld
    {
        IQueryable<S_WeightNote> GetSalesWeightNotes(List<Guid> unids);
        IQueryable<S_WeightNote> GetOngoSalesWeightDocs();
        S_WeightNote GetSalesWeightNote(Guid unid);

        FunctionResult<S_WeightNote> CreateSalesWeightNote(S_WeightNote salesWeightNote,
         List<SalesIngredient> purchaseIngredientList,
         SalesWeightNoteStepData salesWeightNoteResultPrice,
         string docNo,
         AppUser operUserInfo);
    }
}
