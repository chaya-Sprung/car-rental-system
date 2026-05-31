using BL.ClassesBL;
using BL.ClassesDTO;
using System;
using System.Collections.Generic;
using System.Web.Http;
    
namespace API.Controllers
{                               
    // CORS is handled via Web.config headers
    [RoutePrefix("api/customers")]
    public class CustomersController : ApiController
    {
        CustomersBL cbl = new CustomersBL();

        [HttpGet]
        [Route("getcustemerbyid/{id}")]
        public IHttpActionResult GetCustemerById(int id)
        {
            var customer = cbl.GetCustomersById(id);
            if (customer == null) return NotFound();
            return Ok(customer);
        }

        [HttpPost]
        [Route("insertcustomer")]
        public IHttpActionResult Add([FromBody] CustomersDTO c)
        {
            if (c == null) return BadRequest("Data is null");
            try
            {
                bool result = cbl.Add(c);
                if (result) return Ok(new { success = true });
                return BadRequest("Failed to add");
            }
            catch (Exception ex) { return InternalServerError(ex); }
        }

        [HttpGet]
        [Route("getallcustomers")]
        public IHttpActionResult GetCustomers()
        {
            return Ok(cbl.GetCustomers());
        }
    }
}