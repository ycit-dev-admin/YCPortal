using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Models.DTOModels;
using PSI.Core.Models.PageModels.Areas.Sales;
using PSI.Service.Helper;
using PSI.Service.IHelper;
using PSI.Service.IService;
using PSI.Service.Service;

namespace PSI.Service.AutoMapperMappActions
{
    public class SalesWeightNoteLogicMapAction : IMappingAction<S_WeightNote, DTO_SalesWeightNote>
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

        public void Process(S_WeightNote source, DTO_SalesWeightNote destination, ResolutionContext context)
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
