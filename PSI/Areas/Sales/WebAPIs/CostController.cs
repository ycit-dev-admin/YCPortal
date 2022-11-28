using System;
using Microsoft.AspNetCore.Mvc;
using PSI.Areas.Purchase.Helpers;
using PSI.Service.IHelper;
using PSI.Service.IService;

namespace PSI.Areas.Purchase.WebAPIs
{
    // [Area("Purchase")]
    [Route("Sales/api/[controller]")]
    [ApiController]
    public class CostController : ControllerBase
    {
        private readonly ISalesPriceCaculateHelper _iSalesPriceCaculateHelper;

        public CostController(ISalesPriceCaculateHelper iSalesPriceCaculateHelper)
        {

            _iSalesPriceCaculateHelper = iSalesPriceCaculateHelper;
        }

        [HttpGet]
        [Route("[action]")]
        public decimal GetCostUnitPrce(int percent, decimal unitPrice)
        {
            if (percent > 100 ||
                percent < 0)
                return 0m;
            //var lala = (decimal)(percent / 100);
            var ddd = (decimal)percent / 100 * unitPrice;
            return (decimal)percent / 100 * unitPrice;
        }

    }

}
