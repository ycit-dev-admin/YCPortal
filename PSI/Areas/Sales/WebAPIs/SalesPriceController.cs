using Microsoft.AspNetCore.Mvc;
using PSI.Areas.Purchase.Helpers;
using PSI.Service.IHelper;
using PSI.Service.IService;

namespace PSI.Areas.Purchase.WebAPIs
{
    // [Area("Purchase")]
    [Route("Sales/api/[controller]")]
    [ApiController]
    public class SalesPriceController : ControllerBase
    {
        private readonly ISalesPriceCaculateHelper _iSalesPriceCaculateHelper;

        public SalesPriceController(ISalesPriceCaculateHelper iSalesPriceCaculateHelper)
        {

            _iSalesPriceCaculateHelper = iSalesPriceCaculateHelper;
        }

        [HttpGet]
        [Route("[action]")]
        public decimal GetInvoicePrice(double salesWeight, double defectiveWeight, decimal unitPrice, bool hasTax)
        {
            return _iSalesPriceCaculateHelper.GetInvoicePrice(salesWeight, defectiveWeight, unitPrice, hasTax);

        }
        [HttpGet]
        [Route("[action]")]
        public decimal GetDeliveryPrice(double fullWeight, decimal traficUnitPrice, bool hasTax)
        {
            return _iSalesPriceCaculateHelper.GetDeliveryPrice(fullWeight, traficUnitPrice, hasTax);

        }

        [HttpGet]
        [Route("[action]")]
        public decimal GetReceivedPrice(decimal invoicePrice, decimal deliveryPrice)
        {
            return _iSalesPriceCaculateHelper.GetReceivedPrice(invoicePrice, deliveryPrice);

        }

        [HttpGet]
        [Route("[action]")]
        public decimal GetTaxPrice(decimal price)
        {
            return _iSalesPriceCaculateHelper.GetTaxPrice(price);

        }
    }

}
