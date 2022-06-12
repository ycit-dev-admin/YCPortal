using Microsoft.AspNetCore.Mvc;
using PSI.Core.Entities;
using PSI.Core.Enums;
using PSI.Core.Helpers;
using PSI.Mappgins.APIMapping;
using PSI.Models.VEModels;
using PSI.Service.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PSI.APIControllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[AllowAnonymous]  //允許匿名用戶
    public class CustomerContractsController : ControllerBase
    {
        private readonly ICustomerContractService _customerContractService;
        private readonly IPsiService _psiService;
        private readonly ICustomerContractEnumService _iCustomerContractEnumService;
        private readonly API_CustomerContractsMapper _mapperHelper;


        public CustomerContractsController(ICustomerContractService customerContractService,
            IPsiService psiService,
            ICustomerContractEnumService iCustomerContractEnumService)
        {
            _customerContractService = customerContractService;
            _psiService = psiService;
            _iCustomerContractEnumService = iCustomerContractEnumService;
            _mapperHelper = new API_CustomerContractsMapper();
        }



        // GET: api/<CustomerContractController>
        [HttpGet]
        public IEnumerable<CustomerContract> Get()
        {
            return _customerContractService.GetEffectiveCustomerContracts();
            //return new string[] { "value1", "value2" };
        }

        // GET api/<CustomerContractController>/5
        [HttpGet("{guid}")]
        public FunctionResult<VE_CustomerContract> Get(Guid guid)
        {
            var funcRs = new FunctionResult<VE_CustomerContract>();
            var customerContract = _customerContractService.GetCustomerContractsByContractUNID(guid);
            var veCustomerContractMapper = _mapperHelper.GetMapperOfGet<CustomerContract, VE_CustomerContract>();
            var veCustomerContract = veCustomerContractMapper.Map<VE_CustomerContract>(customerContract);


            var customerContractLogs = _customerContractService.GetCustomerContractLogs(guid);
            var contractLogRelDocUNIDs = customerContractLogs.Select(aa => aa.PSI_DOC_UNID).ToList();

            var contractType = (CustomerContractEnum.Types)customerContract.CONTRACT_TYPE;
            if (contractType == CustomerContractEnum.Types.Purchase)  // 進貨合約
            {
                var pWeightNoteList = _psiService.GetPurchaseWeightNotesBy(contractLogRelDocUNIDs);
                var sumWeightValues = pWeightNoteList.Sum(aa => aa.FULL_WEIGHT - aa.DEFECTIVE_WEIGHT).ToString();
                if (long.TryParse(sumWeightValues, out var okVal))
                    veCustomerContract.NowActualWeight = okVal;

                veCustomerContract.NowActualPrice = pWeightNoteList.Sum(aa => aa.ACTUAL_PRICE);
                funcRs.ResultSuccess("查詢成功", veCustomerContract);
            }
            else if (contractType == CustomerContractEnum.Types.Sale)  // 出貨合約
            {
                //
            }
            else
                funcRs.ResultFailure("查無此筆資訊");

            return funcRs;
        }

        //  [HttpGet("{guid}")]
        // [HttpGet("{id}")]
        [HttpGet("GetContractsByCustomerUNID/{unid}")]
        public List<VE_CustomerContract> GetContractsByCustomerUNID(Guid unid)
        {
            var customerContracts = _customerContractService.GetPurchaseContractsByCustomerUNID(unid, _iCustomerContractEnumService);
            var veCustomerContractMapper = _mapperHelper.GetMapperOfGetContractsByCustomerUNID<CustomerContract, VE_CustomerContract>();
            var veCustomerContractList = veCustomerContractMapper.Map<List<VE_CustomerContract>>(customerContracts);
            return veCustomerContractList;
        }

        // POST api/<CustomerContractController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<CustomerContractController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CustomerContractController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
