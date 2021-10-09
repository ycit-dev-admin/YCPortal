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
            _purchaseWeightNoteRepository.Create(purchaseWeightNote);
            _unitOfwork.SaveChange();
            return true;
        }

        public IEnumerable<PurchaseWeightNote> GetAllPurchaseWeightNotes()
        {
            var nowTime = DateTime.Now;
            var curMonthDate = nowTime.AddDays(1 - nowTime.Day);
            var qq = curMonthDate.Date;
            var result = _purchaseWeightNoteRepository.GetAllAsync().Result
                                                      .Where(aa => aa.EffectiveTime.Date >= curMonthDate.Date);
            return result;
        }
    }
}
