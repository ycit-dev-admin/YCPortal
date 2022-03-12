using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Helpers;
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
        //private IHttpContextAccessor _httpContextAccessor;
        //private readonly UserManager<AppUser> _userManager;
        private readonly IUnitOfWork _unitOfwork;
        private readonly IGenericRepository<PurchaseWeightNote> _purchaseWeightNoteRepository;
        private readonly IGenericRepository<CodeTable> _codeTableRepository;
        private readonly IGenericRepository<SeqTypeConfig> _seqTypeConfigRepository;
        private readonly IGenericRepository<PurchaseIngredient> _purchaseIngredientNoteRepository;

        public PsiService(IUnitOfWork unitOfWork)
        {
            //_httpContextAccessor = httpContextAccessor;
            //_userManager = userManager;
            _unitOfwork = unitOfWork;
            _purchaseWeightNoteRepository = unitOfWork.PurchaseWeightNoteRepository;
            _codeTableRepository = unitOfWork.CodeTableRepository;
            _seqTypeConfigRepository = unitOfWork.SeqTypeConfigRepository;
            _purchaseIngredientNoteRepository = unitOfWork.PurchaseIngredientRepository;
        }


        public FunctionResult<PurchaseWeightNote> CreatePurchaseWeightNote(
            PurchaseWeightNote purchaseWeightNote,
            List<PurchaseIngredient> purchaseIngredientLs,
            AppUser operUserInfo)
        {
            /* Null檢核 */
            var funcRs = new FunctionResult<PurchaseWeightNote>();
            if (purchaseWeightNote == null)
            {
                funcRs.ResultFailure("新增失敗，新增磅單為空值!!");
                return funcRs;
            }

            //var curUserInfo = _userManager.GetUserAsync(_httpContextAccessor.HttpContext?.User).Result;

            /* 進貨磅單建立 */
            purchaseWeightNote.FacNo = operUserInfo.FacSite;
            purchaseWeightNote.CREATE_TIME = DateTime.Now;
            purchaseWeightNote.EffectiveTime = DateTime.Now;
            purchaseWeightNote.UPDATE_TIME = DateTime.Now;
            purchaseWeightNote.CREATE_EMPNO = operUserInfo.NickName;
            var cRs = _purchaseWeightNoteRepository.Create(purchaseWeightNote);
            if (!cRs.Success)
            {
                funcRs.ResultFailure(cRs.ActionMessage);
                return funcRs;
            }

            /* 進貨品項建立 */
            purchaseIngredientLs.ForEach(aa =>
            {
                aa.CREATE_TIME = DateTime.Now;
                aa.CREATE_EMPNO = operUserInfo.NickName;
                aa.UPDATE_TIME = DateTime.Now;
                aa.UPDATE_EMPNO = operUserInfo.NickName;
                aa.PurchaseWeighNoteId = purchaseWeightNote.ID;
            });
            var piCreRs = _purchaseIngredientNoteRepository.Create(purchaseIngredientLs);
            if (!piCreRs.Success)
            {
                funcRs.ResultFailure(piCreRs.ActionMessage);
                return funcRs;
            }


            // 合約

            // 車牌 (似乎不用,因為跟著磅單走)            
            funcRs.ResultSuccess("新增進貨磅單成功!!", purchaseWeightNote);

            return funcRs;
        }

        public PurchaseWeightNote GetPurchaseWeightNote(string docNo)
        {
            var result = _purchaseWeightNoteRepository.GetAsync(aa => aa.DocNo == docNo).Result;
            return result;
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
        public IEnumerable<PurchaseWeightNote> GetPurchaseWeightNotes(DateTime sTime, DateTime eTime)
        {
            return _purchaseWeightNoteRepository.GetAllAsync().Result
                                                      .Where(aa => aa.EffectiveTime.Date >= sTime &&
                                                      aa.EffectiveTime.Date <= eTime);
        }

        public IQueryable<PurchaseIngredient> GetPurchaseIngredients(List<long> weightNoteSnLs)
        {
            return _purchaseIngredientNoteRepository.GetAllAsync()
                    .Result
                    .Where(aa => weightNoteSnLs.Contains(aa.PurchaseWeighNoteId)).AsQueryable();
        }

        public IQueryable<PurchaseIngredient> GetPurchaseIngredients(long weightNoteId)
        {
            return _purchaseIngredientNoteRepository.GetAllAsync()
                    .Result
                    .Where(aa => aa.PurchaseWeighNoteId == weightNoteId).AsQueryable();
        }

        public PurchaseIngredient GetMainPurchaseIngredient(long weightNoteId)
        {
            return _purchaseIngredientNoteRepository.GetAllAsync()
                .Result
                .Where(item => item.PurchaseWeighNoteId == weightNoteId)
                .OrderByDescending(aa => aa.ItemPercent).FirstOrDefault();
        }


        public string GetDocNo(string facSite, int psiType)
        {
            // 單號前綴
            string psiCode;
            switch (psiType)
            {
                case 1:
                    psiCode = "P";
                    break;
                case 2:
                    psiCode = "S";
                    break;
                default:
                    psiCode = "D";
                    break;
            }

            var seqType = $@"{facSite.ToUpper()}{psiCode.ToUpper()}{DateTime.Now.ToString("yyMM")}";
            var docNo = "";
            try
            {
                long seqNo;
                var query = _seqTypeConfigRepository.GetAsync(aa => aa.SeqType == seqType).Result;
                if (query == null)
                {
                    seqNo = 1;
                    _seqTypeConfigRepository.Create(new SeqTypeConfig
                    {
                        SeqType = seqType,
                        SeqNo = seqNo
                    });
                }
                else
                {
                    seqNo = query.SeqNo + 1;
                    query.SeqNo = seqNo;
                    _seqTypeConfigRepository.Update(query);
                }

                docNo = $@"{seqType}{seqNo:0000}";
            }
            catch (Exception ex)
            {

            }

            return docNo;
        }

        public IQueryable<CodeTable> GetPayTypeItems()
        {
            return _codeTableRepository.GetAllAsync().Result
                .Where(aa => aa.CodeGroup == "PAY_TYPE").AsQueryable();
        }

        public IQueryable<CodeTable> GetPsiTypeItems()
        {
            return _codeTableRepository.GetAllAsync().Result
                .Where(aa => aa.CodeGroup == "PSI_TYPE").AsQueryable();
        }
    }
}
