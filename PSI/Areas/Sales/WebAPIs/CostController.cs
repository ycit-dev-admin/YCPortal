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
        public CostController()
        {

        }


        [HttpGet]
        [Route("[action]")]
        public decimal GetCostUnitPrce(decimal percent, decimal unitPrice)
        {
            // percent的異常值處理後續可以討論
            percent = percent > 100 ? 100 : percent;
            percent = percent < 0 ? 0 : percent;



            return percent / 100 * unitPrice;
        }

    }

}
