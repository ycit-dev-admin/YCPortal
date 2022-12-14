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
    public class SalesWeightNoteServiceOld : ISalesWeightNoteServiceOld
    {
        private readonly IUnitOfWork _unitOfwork;
        private readonly IGenericRepository<S_WeightNote> _salesWeightNoteRepository;
        private readonly IGenericRepository<S_WeightNote_Ingredient> _salesIngredientRepository;
        private readonly IGenericRepository<SalesWeightNoteStepData> _salesWeightNoteResultPriceRepository;

        public SalesWeightNoteServiceOld(IUnitOfWork unitOfWork)
        {
            _unitOfwork = unitOfWork;
            _salesWeightNoteRepository = _unitOfwork.SalesWeightNoteRepository;
            _salesIngredientRepository = _unitOfwork.SalesIngredientRepository;
            _salesWeightNoteResultPriceRepository = _unitOfwork.SalesWeightNoteResultPriceRepository;
        }

        public SalesWeightNoteServiceOld()
        {
            //_unitOfwork = new UnitOfWork();
        }


        public IQueryable<S_WeightNote> GetSalesWeightNotes(List<Guid> unids)
        {
            return _salesWeightNoteRepository.GetAllAsync()
                .Result.Where(aa => unids.Contains(aa.UNID)).AsQueryable();
        }
        public S_WeightNote GetSalesWeightNote(Guid unid)
        {
            return _salesWeightNoteRepository.GetAsync(aa => aa.UNID == unid).Result;
        }

        public IQueryable<S_WeightNote> GetOngoSalesWeightDocs()
        {
            var needStatus = S_Enum.GetOngoSalesWeightDocStatus()
                .Select(aa => (int)aa);

            return _salesWeightNoteRepository.GetAllAsync()
                .Result.Where(aa => needStatus.Contains(aa.NOTE_STATUS)).AsQueryable();
        }


        public FunctionResult<S_WeightNote> CreateSalesWeightNote(S_WeightNote salesWeightNote,
            List<S_WeightNote_Ingredient> salesIngredientList,
            SalesWeightNoteStepData salesWeightNoteResultPrice,
            string docNo,
            AppUser operUserInfo)
        {
            /* Null檢核 */
            var funcRs = new FunctionResult<S_WeightNote>();
            if (salesWeightNote == null)
            {
                funcRs.ResultFailure("新增失敗，新增磅單為空值!!");
                return funcRs;
            }

            //var curUserInfo = _userManager.GetUserAsync(_httpContextAccessor.HttpContext?.User).Result;

            /* 出貨磅單建立 */
            salesWeightNote.DOC_NO = docNo; // 單號
            salesWeightNote.UNID = Guid.NewGuid();
            salesWeightNote.CREATE_TIME = DateTime.Now;
            salesWeightNote.CREATE_EMPNO = operUserInfo.NICK_NAME;
            salesWeightNote.UPDATE_TIME = DateTime.Now;
            salesWeightNote.UPDATE_EMPNO = operUserInfo.NICK_NAME;



            var cRs = _salesWeightNoteRepository.Create(salesWeightNote);
            if (!cRs.Success)
            {
                funcRs.ResultFailure(cRs.ActionMessage);
                return funcRs;
            }

            /* 出貨品項比例建立 */
            if (salesIngredientList.Any())
            {
                foreach (var item in salesIngredientList)
                {
                    item.SALES_WEIGHTNOTE_UNID = salesWeightNote.UNID;
                    item.CREATE_TIME = DateTime.Now;
                    item.CREATE_EMPNO = operUserInfo.NICK_NAME;
                    item.UPDATE_TIME = DateTime.Now;
                    item.UPDATE_EMPNO = operUserInfo.NICK_NAME;
                }

                var piCreRs = _salesIngredientRepository.Create(salesIngredientList);
                if (!piCreRs.Success)
                {
                    funcRs.ResultFailure(piCreRs.ActionMessage);
                    return funcRs;
                }
            }


            /* 相關金額值建立建立 */
            if (salesWeightNoteResultPrice != null)
            {
                salesWeightNoteResultPrice.DOC_NO = docNo;
                salesWeightNoteResultPrice.DOC_UNID = salesWeightNote.UNID;
                salesWeightNoteResultPrice.CREATE_TIME = DateTime.Now;
                salesWeightNoteResultPrice.CREATE_EMPNO = operUserInfo.NICK_NAME;
                salesWeightNoteResultPrice.UPDATE_TIME = DateTime.Now;
                salesWeightNoteResultPrice.UPDATE_EMPNO = operUserInfo.NICK_NAME;
                var creRs = _salesWeightNoteResultPriceRepository.Create(salesWeightNoteResultPrice);
                if (!creRs.Success)
                {
                    funcRs.ResultFailure(creRs.ActionMessage);
                    return funcRs;
                }
            }






            funcRs.ResultSuccess("新增出貨磅單成功!!", salesWeightNote);

            return funcRs;
        }
    }
}
