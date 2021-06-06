using PSI.Core.Entities;
using PSI.Core.Interfaces.Repository;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Service.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PSI.Service.Service
{
    public class PsiService : IPsiService
    {
        private readonly IUnitOfWork _unitOfwork;
        private readonly IGenericRepository<PurchaseWeightNote> _purchaseWeightNoteRepository;

        public PsiService(IUnitOfWork unitOfWork)
        {
            _unitOfwork = unitOfWork;
            _purchaseWeightNoteRepository = unitOfWork.PurchaseWeightNoteRepository;
        }


        public bool CreatePurchaseWeightNote(PurchaseWeightNote purchaseWeightNote)
        {
            // var qcd = _purchaseWeightNoteRepository.GetAllAsync().Result;
            _purchaseWeightNoteRepository.Add(purchaseWeightNote);
            _unitOfwork.SaveChange();
            return true;
        }

        public IEnumerable<PurchaseWeightNote> GetAllPurchaseWeigntNotes()
        {
            var qq = _purchaseWeightNoteRepository.GetAllAsync().Result.Where(aa=> aa.Id!=1);
            return qq;
        }
    }
}
