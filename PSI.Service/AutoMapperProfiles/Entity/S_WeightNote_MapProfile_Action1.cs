using System;
using System.Linq;
using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Models.DTOModels;
using PSI.Service.IService;

namespace PSI.Service.AutoMapperProfiles.Entity
{
    public class S_WeightNote_MapProfile_Action1 : IMappingAction<S_WeightNote, DTO_S_WeightNote>
    {
        private readonly ICustomerInfoServiceNew _iCustomerInfoServiceNew;
        private readonly IProductItemService _iProductItemService;
        private readonly IProductItemServiceNew _iProductItemServiceNew;
        private readonly ISalesWeightNoteResultPriceService _iSalesWeightNoteResultPriceService;
        private readonly ISalesWeightNoteStepDataService _iSalesWeightNoteStepDataService;
        private readonly ICodeTableServiceNew _iCodeTableServiceNew;
        private readonly ICarNoServiceNew _iCarNoServiceNew;
        private readonly ISalesIngredientServiceNew _iSalesIngredientServiceNew;
        private readonly ICustomerContractServiceNew _iCustomerContractServiceNew;
        private readonly IGenericService<PS_WriteOff_Log> _iPsWriteOffLogService;
        private readonly IGenericService<P_Inventory> _iPInventoryService;

        public S_WeightNote_MapProfile_Action1()
        {
            // _iCustomerInfoService = new CustomerInfoService();
        }

        public S_WeightNote_MapProfile_Action1(ICustomerInfoServiceNew iCustomerInfoServiceNew
            , IProductItemService iProductItemService
            , ISalesWeightNoteResultPriceService iSalesWeightNoteResultPriceService
            , ICodeTableServiceNew iCodeTableServiceNew
            , ICarNoServiceNew iCarNoServiceNew
            , ISalesIngredientServiceNew iSalesIngredientServiceNew
            , IProductItemServiceNew iProductItemServiceNew
            , ISalesWeightNoteStepDataService iSalesWeightNoteStepDataService
            , ICustomerContractServiceNew iCustomerContractServiceNew
            , IGenericService<PS_WriteOff_Log> ipsWriteOffLogService
            , IGenericService<P_Inventory> iPInventoryService
            )
        {
            _iCustomerInfoServiceNew = iCustomerInfoServiceNew ?? throw new ArgumentNullException(nameof(iCustomerInfoServiceNew));
            _iProductItemService = iProductItemService ?? throw new ArgumentNullException(nameof(iProductItemService));
            _iSalesWeightNoteResultPriceService = iSalesWeightNoteResultPriceService ?? throw new ArgumentNullException(nameof(iSalesWeightNoteResultPriceService));
            _iCodeTableServiceNew = iCodeTableServiceNew ?? throw new ArgumentNullException(nameof(iCodeTableServiceNew));
            _iCarNoServiceNew = iCarNoServiceNew ?? throw new ArgumentNullException(nameof(iCarNoServiceNew));
            _iSalesIngredientServiceNew = iSalesIngredientServiceNew ?? throw new ArgumentNullException(nameof(iSalesIngredientServiceNew));
            _iProductItemServiceNew = iProductItemServiceNew ?? throw new ArgumentNullException(nameof(iProductItemServiceNew));
            _iSalesWeightNoteStepDataService = iSalesWeightNoteStepDataService ?? throw new ArgumentNullException(nameof(iSalesWeightNoteStepDataService));
            _iCustomerContractServiceNew = iCustomerContractServiceNew ?? throw new ArgumentNullException(nameof(iCustomerContractServiceNew));
            _iPsWriteOffLogService = ipsWriteOffLogService;
            _iPInventoryService = iPInventoryService;
        }

        public void Process(S_WeightNote src, DTO_S_WeightNote dest, ResolutionContext context)
        {
            //destination.INVOICE_PRICE = _iSalesPriceCaculateHelper.GetInvoicePrice(source.LeaveWeight.Value,
            //        source.DefectiveWeight.Value,
            //        source.UnitPrice.Value,
            //        source.InvoicePriceHasTax);
            //dest.TRAFIC_FEE = _iSalesPriceCaculateHelper.GetDeliveryPrice(source.LeaveWeight.Value,
            //        source.TraficUnitPrice,
            //        source.TraficFeeHasTax);
            //dest.RECEIVED_PRICE = dest.INVOICE_PRICE - dest.TRAFIC_FEE;
            dest.DTO_SWeightNoteIngredients = _iSalesIngredientServiceNew.GetDTOModels<DTO_S_WeightNote_Ingredient>(aa => aa.SALES_WEIGHTNOTE_UNID == src.UNID);
            dest.DTO_CustomerInfo = _iCustomerInfoServiceNew.GetDTOModel<DTO_CustomerInfo>(aa => aa.CUSTOMER_GUID == src.CUSTOMER_UNID);
            dest.DTO_SalesWeightNoteStepDatas = _iSalesWeightNoteStepDataService.GetDTOModels<DTO_SalesWeightNoteStepData>(aa => aa.DOC_UNID == src.UNID);
            dest.DTO_CustomerCar = _iCarNoServiceNew.GetDTOModel<DTO_CustomerCar>(aa => aa.CAR_GUID == src.CARNO_UNID);
            dest.DTO_CustomerContracts = _iCustomerContractServiceNew.GetDTOModels<DTO_CustomerContract>(aa => aa.CUSTOMER_GUID == src.CUSTOMER_UNID);
            dest.DTO_PSWriteOffLog = _iPsWriteOffLogService.GetDTOModels<DTO_PS_WriteOff_Log>(aa => aa.SALES_WEIGHTNOTE_UNID == src.UNID);
            var relPurchaseUNIDs = dest.DTO_PSWriteOffLog.Select(aa => aa.PURCHASE_WEIGHTNOTE_UNID).ToList();
            dest.DTO_PInventories = _iPInventoryService.GetDTOModels<DTO_P_Inventory>(aa => relPurchaseUNIDs.Contains(aa.PURCHASE_WEIGHTNOTE_UNID));




            //dest.EstimateInvoicePrice = _iSalesWeightNoteResultPriceService.GetEstimateSalesWeightNoteResultPrice(src.UNID).INVOICE_PRICE;
            //dest.EstimateReceivedTypePayTypeName = _iCodeTableServiceNew.GetReceivedTypeItems()
            //                       .FirstOrDefault(aa => aa.CODE_VALUE == src.ESTIMATE_RECEIVED_TYPE.ToString()).CODE_TEXT;





        }
    }
}
