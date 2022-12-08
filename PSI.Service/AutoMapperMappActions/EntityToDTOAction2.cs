using System;
using System.Linq;
using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Models.DTOModels;
using PSI.Core.Models.PageModels.Areas.Sales;
using PSI.Service.IService;

namespace PSI.Service.AutoMapperMappActions
{
    public class EntityToDTOAction2 : IMappingAction<S_WeightNote, WeightNoteUpdateActualData>
    {
        private readonly ICarNoService _iCarNoService;
        private readonly ISalesIngredientServiceNew _iSalesIngredientServiceNew;
        private readonly ISalesWeightNoteService _iSalesWeightNoteService;


        public EntityToDTOAction2(ICarNoService iCarNoService
            , ISalesIngredientServiceNew iSalesIngredientServiceNew
            , ISalesWeightNoteService iSalesWeightNoteService
            )
        {
            //_iCustomerInfoServiceNew = iCustomerInfoServiceNew ?? throw new ArgumentNullException(nameof(iCustomerInfoServiceNew));
            //_iProductItemService = iProductItemService ?? throw new ArgumentNullException(nameof(iProductItemService));
            _iCarNoService = iCarNoService ?? throw new ArgumentNullException(nameof(iCarNoService));
            _iSalesIngredientServiceNew = iSalesIngredientServiceNew ?? throw new ArgumentNullException(nameof(iSalesIngredientServiceNew));
            _iSalesWeightNoteService = iSalesWeightNoteService ?? throw new ArgumentNullException(nameof(iSalesWeightNoteService));

        }

        public void Process(S_WeightNote src, WeightNoteUpdateActualData tar, ResolutionContext context)
        {
            //tar.DTOSalesWeightNote = _iSalesWeightNoteService.GetDTOModel<DTO_SalesWeightNote>(aa => aa.UNID == src.UNID);


            //tar.DTOSalesIngredients = _iSalesIngredientServiceNew.GetDTOModels<DTO_SalesIngredient>(aa => aa.SALES_WEIGHTNOTE_UNID == src.UNID);
            //tar.EstimateMainItemName = _iProductItemService.GetProductItem(src.ESTIMATE_PRODUCT_ITEM_UNID).PRODUCT_NAME;
            //tar.CustomerName = _iCustomerInfoServiceNew.GetDTOModel<DTO_CustomerInfo>(aa => aa.CUSTOMER_GUID == src.CUSTOMER_UNID).CUSTOMER_NAME;

            //tar.EstimateInvoicePrice = _iSalesWeightNoteResultPriceService.GetEstimateSalesWeightNoteResultPrice(src.UNID).INVOICE_PRICE));










        }
    }
}
