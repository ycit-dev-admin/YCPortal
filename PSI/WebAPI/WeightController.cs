using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PSI.Service.IHelper;

namespace PSI.WebAPI
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeightController : ControllerBase
    {
        private readonly IWeightCaculateHelper _iWeightCaculateHelper;

        public WeightController(IWeightCaculateHelper iWeightCaculateHelper)
        {
            /* Helper */
            _iWeightCaculateHelper = iWeightCaculateHelper;
        }

        [HttpGet]
        [Route("[action]")]
        public decimal GetProportionWeight(decimal nominator, decimal totalWeight)
        {
            return _iWeightCaculateHelper.GetProportionWeight(nominator, totalWeight);
            //return _iSalesPriceCaculateHelper.GetInvoicePrice(salesWeight, defectiveWeight, unitPrice, hasTax);

        }
    }

}
