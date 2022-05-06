using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Enums;
using PSI.Core.Extensions;
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
    public class CodeTableService : ICodeTableService
    {
        //private IHttpContextAccessor _httpContextAccessor;
        //private readonly UserManager<AppUser> _userManager;
        private readonly IUnitOfWork _unitOfwork;
        private readonly IGenericRepository<PurchaseWeightNote> _purchaseWeightNoteRepository;
        private readonly IGenericRepository<CodeTable> _codeTableRepository;
        private readonly IGenericRepository<SeqTypeConfig> _seqTypeConfigRepository;
        private readonly IGenericRepository<PurchaseIngredient> _purchaseIngredientNoteRepository;

        public CodeTableService(IUnitOfWork unitOfWork)
        {
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
            purchaseWeightNote.FAC_NO = operUserInfo.FacSite;
            purchaseWeightNote.CREATE_TIME = DateTime.Now;
            purchaseWeightNote.EFFECTIVE_TIME = DateTime.Now;
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
                aa.PURCHASE_WEIGHTNOTE_UNID = purchaseWeightNote.UNID;
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



        public IQueryable<CodeTable> GetPayTypeItems()
        {
            return _codeTableRepository.GetAllAsync().Result
                .Where(aa => aa.CODE_GROUP == "PAY_TYPE").AsQueryable();
        }

        public IQueryable<CodeTable> GetPsiTypeItems()
        {
            return _codeTableRepository.GetAllAsync().Result
                .Where(aa => aa.CODE_GROUP == "PSI_TYPE").AsQueryable();
        }

        public IQueryable<CodeTable> GetContractTypeItems()
        {
            return _codeTableRepository.GetAllAsync().Result
                .Where(aa => aa.CODE_GROUP == "CONTRACT_TYPE").AsQueryable();
        }
        public IQueryable<CodeTable> GetPurchaseContractTypeItems()
        {
            return _codeTableRepository.GetAllAsync().Result
                .Where(aa => aa.CODE_GROUP == "CONTRACT_TYPE" &&
                new[] { "1", "3" }.Contains(aa.CODE_VALUE)).AsQueryable();
        }


    }
}
