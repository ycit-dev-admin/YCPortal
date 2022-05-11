using Microsoft.AspNetCore.Mvc;
using PSI.Areas.Purchase.Helpers;
using PSI.Service.IService;

namespace PSI.Areas.Purchase.WebAPIs
{
    // [Area("Purchase")]
    [Route("Purchase/api/[controller]")]
    [ApiController]
    public class PurchasePriceController : ControllerBase
    {
        private readonly IPsiService _psiService;

        public PurchasePriceController(IPsiService psiService)
        {
            _psiService = psiService;
        }

        [HttpGet]
        [Route("[action]")]
        public decimal GetWeightNotePrice(double fullWeight, double defectiveWeight, decimal unitPrice, bool hasTax)
        {
            return _psiService.GetWeightNotePrice(fullWeight, defectiveWeight, unitPrice, hasTax);

        }
        [HttpGet]
        [Route("[action]")]
        public decimal GetDeliveryPrice(double fullWeight, decimal traficUnitPrice)
        {
            return _psiService.GetDeliveryPrice(fullWeight, traficUnitPrice);

        }

        [HttpGet]
        [Route("[action]")]
        public decimal GetActualPayPrice(decimal thirdWeightPrice, decimal weightNotePrice, decimal deliveryPrice)
        {
            return _psiService.GetActualPayPrice(thirdWeightPrice, weightNotePrice, deliveryPrice);

        }
    }

}
