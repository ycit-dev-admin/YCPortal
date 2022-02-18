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
        /* PurchaseWeightNote */
        FunctionResult<PurchaseWeightNote> CreatePurchaseWeightNote(PurchaseWeightNote purchaseWeightNote,
            List<PurchaseIngredient> purchaseIngredientLs,
            AppUser operUserInfo);

        IEnumerable<PurchaseWeightNote> GetAllPurchaseWeightNotes();
        IEnumerable<PurchaseWeightNote> GetPurchaseWeightNotes(DateTime sTime, DateTime eTime);
        PurchaseWeightNote GetPurchaseWeightNote(string docNo);



        /* PurchaseWeightNote */
        IQueryable<PurchaseIngredient> GetPurchaseIngredients(List<long> weightNoteSnLs);
        IQueryable<PurchaseIngredient> GetPurchaseIngredients(long weightNoteId);
        PurchaseIngredient GetMainPurchaseIngredient(long weightNoteId);


        /* CodeTable */
        IQueryable<CodeTable> GetPayTypeItems();
        IQueryable<CodeTable> GetPsiTypeItems();
        string GetDocNo(string facSite, int psiType);
    }
}
