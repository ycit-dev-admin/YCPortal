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


        public FunctionResult CreatePurchaseWeightNote(
            PurchaseWeightNote purchaseWeightNote,
            List<PurchaseIngredient> purchaseIngredientLs,
            AppUser operUserInfo)
        {
            var funcRs = new FunctionResult();
            if (purchaseWeightNote != null)
            {
                //var curUserInfo = _userManager.GetUserAsync(_httpContextAccessor.HttpContext?.User).Result;
                purchaseWeightNote.FacNo = operUserInfo.FacSite;
                purchaseWeightNote.CreateTime = DateTime.Now;
                purchaseWeightNote.EffectiveTime = DateTime.Now;
                purchaseWeightNote.UpdateTime = DateTime.Now;
                purchaseWeightNote.CreateEmpNo = operUserInfo.NickName;
                var cRs = _purchaseWeightNoteRepository.Create(purchaseWeightNote);

                if (!cRs.Success)
                {
                    funcRs.ResultFailure(cRs.ActionMessage);
                    return funcRs;
                }

                // 進貨品項                
                var purchaseIngredients = purchaseIngredientLs.Select(aa =>
                {
                    aa.CreateTime = DateTime.Now;
                    aa.CreateEmpNo = operUserInfo.NickName;
                    aa.UpdateTime = DateTime.Now;
                    aa.UpdateEmpNo = operUserInfo.NickName;
                    aa.PurchaseWeighNoteId = purchaseWeightNote.Id;
                    return aa;
                });

                var piRs = _purchaseIngredientNoteRepository.Create(purchaseIngredients.ToList());

                // 合約

                // 車牌 (似乎不用,因為跟著磅單走)            



                funcRs.ResultSuccess("新增進貨磅單成功!!");
            }
            else
            {
                funcRs.ResultFailure("無進貨磅單可新增!!");
            }
            return funcRs;
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
    }
}
