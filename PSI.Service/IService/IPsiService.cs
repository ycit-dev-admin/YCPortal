using PSI.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace PSI.Service.IService
{
    public interface IPsiService
    {
        bool CreatePurchaseWeightNote(PurchaseWeightNote purchaseWeightNote);

        IEnumerable<PurchaseWeightNote> GetAllPurchaseWeigntNotes();
    }
}
