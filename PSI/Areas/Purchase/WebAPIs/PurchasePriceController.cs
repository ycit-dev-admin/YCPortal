using Microsoft.AspNetCore.Mvc;
using PSI.Areas.Purchase.Helpers;

namespace PSI.Areas.Purchase.WebAPIs
{
    // [Area("Purchase")]
    [Route("Purchase/api/[controller]")]
    [ApiController]
    public class PurchasePriceController : ControllerBase
    {

        [HttpGet]
        [Route("[action]")]
        public decimal GetWeightNotePrice(double fullWeight, double defectiveWeight, decimal unitPrice, bool hasTax)
        {
            return new PurchasePriceHelper()
                .GetWeightNotePrice(fullWeight, defectiveWeight, unitPrice, hasTax);

        }
        [HttpGet]
        [Route("[action]")]
        public decimal GetDeliveryPrice(double fullWeight, decimal traficUnitPrice)
        {
            return new PurchasePriceHelper()
                .GetDeliveryPrice(fullWeight, traficUnitPrice);

        }

        [HttpGet]
        [Route("[action]")]
        public decimal GetActualPayPrice(decimal thirdWeightPrice, decimal weightNotePrice, decimal deliveryPrice)
        {
            return new PurchasePriceHelper()
                .GetActualPayPrice(thirdWeightPrice, weightNotePrice, deliveryPrice);

        }
    }

}
