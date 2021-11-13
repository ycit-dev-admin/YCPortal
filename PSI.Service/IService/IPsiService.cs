using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace PSI.Service.IService
{
    public interface IPsiService
    {
        FunctionResult CreatePurchaseWeightNote(PurchaseWeightNote purchaseWeightNote,
            List<PurchaseIngredient> purchaseIngredientLs,
            AppUser operUserInfo);

        IEnumerable<PurchaseWeightNote> GetAllPurchaseWeightNotes();
        IQueryable<CodeTable> GetPayTypeItems();
        string GetDocNo(string facSite, int psiType);
    }
}
