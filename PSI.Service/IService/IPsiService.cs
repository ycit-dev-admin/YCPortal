using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Enums;
using PSI.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;


namespace PSI.Service.IService
{
    public interface IPsiService
    {
        /* PSIWeightNoteEnum */
        public Dictionary<int, PSIWeightNoteEnum.PWeightNotesStatus> GetPurchaseWeightNotesStatus();

        /* PurchaseWeightNote */
        FunctionResult<PurchaseWeightNote> CreatePurchaseWeightNote(PurchaseWeightNote purchaseWeightNote,
            List<PurchaseIngredient> purchaseIngredientLs,
            AppUser operUserInfo,
            ICustomerContractService customerContractService,
            CustomerInfo customerInfo = null,
            CustomerCar customerCar = null,
            CustomerContractLog customerContractLog = null);

        IEnumerable<PurchaseWeightNote> GetAllPurchaseWeightNotes();
        IEnumerable<PurchaseWeightNote> GetPurchaseWeightNotes(DateTime sTime, DateTime eTime);
        IQueryable<PurchaseWeightNote> GetPurchaseWeightNotesBy(List<Guid> weightNoteUNIDList);
        PurchaseWeightNote GetPurchaseWeightNote(string docNo);
        PurchaseWeightNote GetPurchaseWeightNote(Guid unid);



        /* PurchaseWeightNote */
        IQueryable<PurchaseIngredient> GetPurchaseIngredients(List<Guid> purchaseWeightNoteUNIDs);
        IQueryable<PurchaseIngredient> GetPurchaseIngredients(Guid purchaseWeightNoteUNID);


        /* CodeTable */
        IQueryable<CodeTable> GetPayTypeItems();
        IQueryable<CodeTable> GetPsiTypeItems();
        IQueryable<CodeTable> GetContractTypeItems();
        string GetDocNo(string facSite, int psiType);
    }
}
