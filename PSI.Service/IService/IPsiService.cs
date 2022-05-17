﻿using PSI.Core.Entities;
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
        /* Public Function  */
        public decimal GetWeightNotePrice(double fullWeight, double defectiveWeight, decimal unitPrice, bool hasTax); // 進貨計價金額 = (進廠重量 - 扣重) * 單價 * 稅率
        public decimal GetDeliveryPrice(double fullWeight, decimal traficUnitPrice); // 運費 = 進廠重量 * 運費單價
        public decimal GetActualPayPrice(decimal thirdWeightPrice, decimal weightNotePrice, decimal deliveryPrice); // 實付金額 = (磅費 + 計價金額 + 運費)
        string GetWeightNoteDocNo(string facSite, PSIEnum.PSIType psiType);

        /* PSIWeightNoteEnum */
        public Dictionary<int, PSIWeightNoteEnum.PWeightNotesStatus> GetPurchaseWeightNotesStatus();
        public Dictionary<string, PSIEnum.FacSite> GetFacSites();

        /* PurchaseWeightNote */
        FunctionResult<PurchaseWeightNote> CreatePurchaseWeightNoteForNormal(PurchaseWeightNote purchaseWeightNote,
            List<PurchaseIngredient> purchaseIngredientLs,
            AppUser operUserInfo,
            ICustomerContractService customerContractService,
            ICustomerService customerService,
            CustomerInfo customerInfo = null,
            CustomerCar customerCar = null,
            CustomerContractLog customerContractLog = null);

        IEnumerable<PurchaseWeightNote> GetAllPurchaseWeightNotes();
        IQueryable<PurchaseWeightNote> GetPurchaseWeightNotes(DateTime sTime, DateTime eTime);
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

    }
}
