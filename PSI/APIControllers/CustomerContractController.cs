using Microsoft.AspNetCore.Mvc;
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
    public class CustomerContractController : ControllerBase
    {
        private readonly ICustomerService _customerService;


        public CustomerContractController(ICustomerService customerService)
        {
            _customerService = customerService;
        }



        // GET: api/<CustomerContractController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<CustomerContractController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
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
