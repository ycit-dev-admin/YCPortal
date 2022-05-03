using Microsoft.AspNetCore.Mvc;
using PSI.Core.Entities;
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
    public class CustomerCarsController : ControllerBase
    {
        private readonly ICustomerService _customerService;


        public CustomerCarsController(ICustomerService customerService)
        {
            _customerService = customerService;
        }



        // GET: api/<CustomerContractController>
        //[HttpGet]
        //public IEnumerable<CustomerCar> Get()
        //{
        //    return _customerService.GetCustomerCarBy(1);
        //    //return new string[] { "value1", "value2" };
        //}
        [HttpGet]
        public IActionResult Get(Guid customerUNID)
        {
            var apiRs = _customerService.GetCustomerCar(customerUNID).Select(aa => new
            {
                CarName = aa.CAR_NAME,
                CarNoUNID = aa.CAR_GUID
            });
            return Ok(apiRs);
        }

        // GET api/<CustomerContractController>/5
        //[HttpGet("{id}")]
        //public IEnumerable<CustomerContract> Getabc(long id)
        //{
        //    return _customerService.GetCustomerContractsByCustomerId(id);
        //}

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
