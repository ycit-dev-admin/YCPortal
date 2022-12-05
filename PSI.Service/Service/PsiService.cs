using System;
using System.Collections.Generic;
using System.Linq;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Enums;
using PSI.Core.Helpers;
using PSI.Core.Interfaces.Repository;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Service.IService;

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
        private readonly IGenericRepository<CustomerInfo> _customerInfoRepository;
        private readonly IGenericRepository<CustomerCar> _customerCarRepository;
        private readonly IGenericRepository<CustomerContract> _customerContractRepository;
        private readonly IGenericRepository<CustomerContractLog> _customerContractLogRepository;

        public PsiService()
        {
        }
        public PsiService(IUnitOfWork unitOfWork)
        {
            //_httpContextAccessor = httpContextAccessor;
            //_userManager = userManager;
            _unitOfwork = unitOfWork;
            _purchaseWeightNoteRepository = _unitOfwork.PurchaseWeightNoteRepository;
            _codeTableRepository = _unitOfwork.CodeTableRepository;
            _seqTypeConfigRepository = _unitOfwork.SeqTypeConfigRepository;
            _purchaseIngredientNoteRepository = _unitOfwork.PurchaseIngredientRepository;
            _customerInfoRepository = _unitOfwork.CustomerInfoRepository;
            _customerCarRepository = _unitOfwork.CustomerCarRepository;
            _customerContractRepository = _unitOfwork.CustomerContractRepository;
            _customerContractLogRepository = _unitOfwork.CustomerContractLogRepository;
        }




        public Dictionary<string, PSIEnum.FacSite> GetFacSites()
        {
            //var abc =
            //    Enum.GetValues(typeof(PSIWeightNoteEnum.PWeightNotesStatus)).Cast<PSIWeightNoteEnum.PWeightNotesStatus>().Select
            //        (r => new KeyValuePair<int, string>((int)r, "")).Select(aa=> aa.;

            return Enum.GetValues(typeof(PSIEnum.FacSite))
                       .Cast<PSIEnum.FacSite>()
                       .ToDictionary(r => r.ToString(), r => r);

            // return new[] { PSIWeightNoteEnum.PWeightNotesStatus.Ongo };

            //var(CustomerContractEnum.Status)aa.CONTRACT_STATU;

            //var abc = needStatus.Select(aa =>)
            //return typeof(CustomerContractEnum.Types).GetAllFieldInfo()
            //    .Where(fieldInfo => CustomerContractEnum.Types).Select(item =>
            // item.GetRawConstantValue().ToString()).AsQueryable();
        }

        public FunctionResult<PurchaseWeightNote> CreatePurchaseWeightNoteForNormal(
            PurchaseWeightNote purchaseWeightNote,
            List<PurchaseIngredient> purchaseIngredientLs,
            AppUser operUserInfo,
            ICustomerContractService customerContractService,
            ICustomerService customerService,
            CustomerInfo tempCustomerInfo = null,
            CustomerCar tempCustomerCar = null,
            CustomerContractLog customerContractLog = null)
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
            purchaseWeightNote.UNID = Guid.NewGuid();
            purchaseWeightNote.DOC_NO = this.GetWeightNoteDocNo(operUserInfo.FAC_SITE, PSIEnum.PSIType.Purchase);
            purchaseWeightNote.WEIGHT_PRICE = this.GetWeightNotePrice(purchaseWeightNote.FULL_WEIGHT,
               purchaseWeightNote.DEFECTIVE_WEIGHT,
               purchaseWeightNote.UNIT_PRICE,
               purchaseWeightNote.HAS_TAX);
            purchaseWeightNote.DELIVERY_FEE = this.GetDeliveryPrice(purchaseWeightNote.FULL_WEIGHT, purchaseWeightNote.TRAFIC_UNIT_PRICE.Value);
            purchaseWeightNote.ACTUAL_PRICE = this.GetActualPayPrice(purchaseWeightNote.THIRD_WEIGHT_FEE,
               purchaseWeightNote.WEIGHT_PRICE.Value,
               purchaseWeightNote.DELIVERY_FEE);
            purchaseWeightNote.FAC_NO = operUserInfo.FAC_SITE;
            purchaseWeightNote.CAR_NO = purchaseWeightNote.CAR_NO.ToUpper();
            purchaseWeightNote.CREATE_EMPNO = operUserInfo.NICK_NAME;
            purchaseWeightNote.CREATE_TIME = DateTime.Now;
            purchaseWeightNote.EFFECTIVE_TIME = DateTime.Now;
            purchaseWeightNote.UPDATE_EMPNO = operUserInfo.NICK_NAME;
            purchaseWeightNote.UPDATE_TIME = DateTime.Now;
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
                aa.CREATE_EMPNO = operUserInfo.NICK_NAME;
                aa.UPDATE_TIME = DateTime.Now;
                aa.UPDATE_EMPNO = operUserInfo.NICK_NAME;
                aa.PURCHASE_WEIGHTNOTE_UNID = purchaseWeightNote.UNID;
            });
            var piCreRs = _purchaseIngredientNoteRepository.Create(purchaseIngredientLs);
            if (!piCreRs.Success)
            {
                funcRs.ResultFailure(piCreRs.ActionMessage);
                return funcRs;
            }
            /* 合約紀錄建立 */
            if (customerContractLog != null)
            {
                customerContractLog.PSI_DOC_UNID = purchaseWeightNote.UNID;
                var creRs = _customerContractLogRepository.Create(customerContractLog);
                var isCustomerContractCompleted = !creRs.Success ?
                    false :
                    customerContractService.IsCustomerContractCompleted(purchaseWeightNote.CONTRACT_UNID.Value);

                if (isCustomerContractCompleted) // 若合約完成了要更新合約狀態
                {
                    var customerContract = customerContractService.GetCustomerContract(purchaseWeightNote.CONTRACT_UNID.Value);
                    customerContractService.UpdateCustomerContractStatus(customerContract,
                        CustomerContractEnum.Status.Completed,
                        operUserInfo);
                }
            }


            /* 臨時客戶建立 */
            if (tempCustomerInfo != null)
            {
                tempCustomerInfo.PSI_TYPE = (int)PSIEnum.PSIType.Purchase;
                tempCustomerInfo.REMARK = "透過臨時客戶功能建立";
                var customerInfoRs = customerService.CreateCustomerInfoForNormal(tempCustomerInfo, operUserInfo);

                // 臨時車牌建立        
                if (customerInfoRs.Success && tempCustomerCar != null)
                {
                    tempCustomerCar.REMARK = "透過臨時車牌功能建立";
                    tempCustomerCar.CUSTOMER_GUID = tempCustomerInfo.CUSTOMER_GUID;
                    var customerCarRs = customerService.CreateCustomerCarForNormal(tempCustomerCar, operUserInfo);
                }


            }



            funcRs.ResultSuccess("新增進貨磅單成功!!", purchaseWeightNote);

            return funcRs;
        }


        public PurchaseWeightNote GetPurchaseWeightNote(Guid unid)
        {
            var result = _purchaseWeightNoteRepository.GetAsync(aa => aa.UNID == unid).Result;
            return result;
        }


        public IQueryable<PurchaseWeightNote> GetPurchaseWeightNotes(DateTime sTime, DateTime eTime)
        {
            return _purchaseWeightNoteRepository.GetAllAsync().Result
                                                      .Where(aa => aa.EFFECTIVE_TIME.Date >= sTime &&
                                                      aa.EFFECTIVE_TIME.Date <= eTime).AsQueryable();
        }
        public IQueryable<PurchaseWeightNote> GetPurchaseWeightNotes(List<Guid> weightNoteUNIDList)
        {
            return _purchaseWeightNoteRepository.GetAllAsync().Result
                                                      .Where(aa => weightNoteUNIDList.Contains(aa.UNID))
                                                      .AsQueryable();
        }

        public IQueryable<PurchaseIngredient> GetPurchaseIngredients(List<Guid> purchaseWeighNoteUNIDs)
        {
            return _purchaseIngredientNoteRepository.GetAllAsync()
                    .Result
                    .Where(aa => purchaseWeighNoteUNIDs.Contains(aa.PURCHASE_WEIGHTNOTE_UNID)).AsQueryable();
        }

        public IQueryable<PurchaseIngredient> GetPurchaseIngredients(Guid purchaseWeighNoteUNID)
        {
            return _purchaseIngredientNoteRepository.GetAllAsync()
                    .Result
                    .Where(aa => aa.PURCHASE_WEIGHTNOTE_UNID == purchaseWeighNoteUNID).AsQueryable();
        }



        public string GetWeightNoteDocNo(string facSite, PSIEnum.PSIType psiType)
        {
            // 單號前綴
            string psiCode;
            switch (psiType)
            {
                case PSIEnum.PSIType.Purchase:
                    psiCode = "P";
                    break;
                case PSIEnum.PSIType.Sale:
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
                var query = _seqTypeConfigRepository.GetAsync(aa => aa.SEQ_TYPE == seqType).Result;
                if (query == null)
                {
                    seqNo = 1;
                    _seqTypeConfigRepository.Create(new SeqTypeConfig
                    {
                        SEQ_TYPE = seqType,
                        SEQ_NO = seqNo
                    });
                }
                else
                {
                    seqNo = query.SEQ_NO + 1;
                    query.SEQ_NO = seqNo;
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
                .Where(aa => aa.CODE_GROUP == "PAY_TYPE").AsQueryable();
        }

        public IQueryable<CodeTable> GetPsiTypeItems()
        {
            return _codeTableRepository.GetAllAsync().Result
                .Where(aa => aa.CODE_GROUP == "PSI_TYPE").AsQueryable();
        }



        public decimal GetWeightNotePrice(double fullWeight, double defectiveWeight, decimal unitPrice, bool hasTax)
        {
            var caculateWeight = fullWeight - defectiveWeight;
            if (caculateWeight <= 0 || unitPrice <= 0)
                return 0;

            var taxVal = hasTax ? 1.05 : 1;
            return (decimal)caculateWeight * unitPrice * (decimal)taxVal;
        }

        public decimal GetDeliveryPrice(double fullWeight, decimal traficUnitPrice)
        {
            if (fullWeight <= 0 || traficUnitPrice <= 0)
                return 0;

            return (decimal)fullWeight * traficUnitPrice;
        }

        public decimal GetActualPayPrice(decimal thirdWeightPrice, decimal weightNotePrice, decimal deliveryPrice)
        {
            return thirdWeightPrice + weightNotePrice + deliveryPrice < 0 ?
                0 :
                decimal.Round(thirdWeightPrice + weightNotePrice + deliveryPrice);
        }
    }
}
