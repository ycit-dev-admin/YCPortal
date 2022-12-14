using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Models.DTOModels;
using PSI.Service.IService;
using System;

namespace PSI.Service.AutoMapperMappActions
{
    public class SalesWeightNoteLogicMapAction : IMappingAction<S_WeightNote, DTO_S_WeightNote>
    {
        private readonly ICustomerInfoService _iCustomerInfoService;

        public SalesWeightNoteLogicMapAction()
        {
            // _iCustomerInfoService = new CustomerInfoService();
        }

        public SalesWeightNoteLogicMapAction(ICustomerInfoService iCustomerInfoService)
        {
            _iCustomerInfoService = iCustomerInfoService ?? throw new ArgumentNullException(nameof(iCustomerInfoService));
        }

        public void Process(S_WeightNote source, DTO_S_WeightNote destination, ResolutionContext context)
        {
            //destination.INVOICE_PRICE = _iSalesPriceCaculateHelper.GetInvoicePrice(source.LeaveWeight.Value,
            //        source.DefectiveWeight.Value,
            //        source.UnitPrice.Value,
            //        source.InvoicePriceHasTax);
            //destination.TRAFIC_FEE = _iSalesPriceCaculateHelper.GetDeliveryPrice(source.LeaveWeight.Value,
            //        source.TraficUnitPrice,
            //        source.TraficFeeHasTax);
            //destination.RECEIVED_PRICE = destination.INVOICE_PRICE - destination.TRAFIC_FEE;
            // destination.CustomerName = _iCustomerInfoService.GetCustomerInfo(source.CUSTOMER_UNID).CUSTOMER_NAME;
        }
    }
}
