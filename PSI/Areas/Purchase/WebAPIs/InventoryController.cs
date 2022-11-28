using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using PSI.Core.Entities;
using PSI.Core.Models.DTOModels;
using PSI.Service.IService;

namespace PSI.Areas.Purchase.WebAPIs
{
    // [Area("Purchase")]
    [Route("Purchase/api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly IGenericService<P_Inventory> _pInventoryService;

        public InventoryController(IGenericService<P_Inventory> pInventoryService)
        {
            _pInventoryService = pInventoryService;
        }

        [HttpGet]
        [Route("[action]")]
        public string GetInventoryWeight(Guid prodItemGuid)
        {
            var remainingInventory = _pInventoryService.GetDTOModels<DTO_P_Inventory>(aa => aa.STATUS != 0 &&
                                                                        aa.PRODUCT_UNID == prodItemGuid);
            var returnRs = remainingInventory.Sum(aa => aa.REMAINING_WEIGHT);
            return returnRs.ToString("N0");
            //return _psiService.GetActualPayPrice(thirdWeightPrice, weightNotePrice, deliveryPrice);
        }

        [HttpGet]
        [Route("[action]")]
        public string GetInventoryUnitPrice(Guid prodItemGuid)
        {
            var remainingInventory = _pInventoryService
                                     .GetDTOModels<DTO_P_Inventory>(aa => aa.STATUS != 0 &&
                                                                    aa.PRODUCT_UNID == prodItemGuid);
            if (!remainingInventory.Any())
                return 0m.ToString("N0");

            var totalWeight = remainingInventory.Sum(aa => aa.REMAINING_WEIGHT);
            var totalPrice = remainingInventory.Sum(aa => aa.REMAINING_WEIGHT * aa.UNIT_PRICE);

            return (totalPrice / totalWeight).ToString("N2");  
            //return _psiService.GetActualPayPrice(thirdWeightPrice, weightNotePrice, deliveryPrice);

        }
    }

}
