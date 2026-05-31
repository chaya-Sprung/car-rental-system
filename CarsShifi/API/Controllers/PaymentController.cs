using BL.ClassesBL;
using BL.ClassesDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace API.Controllers
{
    [RoutePrefix("api/payments")]
    public class PayMentsController : ApiController
    {
        PayMentsBL bl = new PayMentsBL();

        [HttpPost]
        [Route("add")]
        public IHttpActionResult AddPayment([FromBody] PayMentsDTO payment)
        {
            if (payment == null) return BadRequest();

            bool isSuccess = bl.Add(payment);
            if (isSuccess)
                return Ok(true);

            return InternalServerError();
        }
    }
}