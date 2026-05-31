using BL.ClassesBL;
using BL.ClassesDTO;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace API.Controllers
{
    [RoutePrefix("api/rents")]
    public class RentsController : ApiController
    {
        RentsBL rbl = new RentsBL();

        // 1. קבלת כל ההשכרות
        [HttpGet]
        [Route("getallrents")]
        public List<RentsDTO> GetRents()
        {
            return rbl.GetRents();
        }

        // 2. קבלת השכרות לפי קוד רכב - זה מה שגרם לך ל-404 באנגולר!
        [HttpGet]
        [Route("getrentsbycarcode/{carCode}")]
        public List<RentsDTO> GetRentsByCarCode(int carCode)
        {
            return rbl.GetRentsByCarCode(carCode);
        }

        // 3. קבלת השכרות לפי קוד לקוח
        [HttpGet]
        [Route("getrentsbycustomerid/{customerId}")]
        public List<RentsDTO> GetRentsByCustomerId(int customerId)
        {
            return rbl.GetRentsByCustomerId(customerId);
        }

        // 4. קבלת השכרה בודדת לפי ID
        [HttpGet]
        [Route("getrentsbyid/{rentsCode}")]
        public RentsDTO GetRentsById(int rentsCode)
        {
            return rbl.GetRentsById(rentsCode);
        }

        // 5. הוספת השכרה חדשה
        [HttpPost]
        [Route("add")]
        public bool Add([FromBody] RentsDTO c)
        {
            if (c == null) return false;
            return rbl.Add(c);
        }

        // 6. עדכון השכרה
        [HttpPost]
        [Route("update")]
        public bool Update([FromBody] RentsDTO c)
        {
            if (c == null) return false;
            return rbl.Update(c);
        }

        // 7. מחיקת השכרה
        [HttpPost]
        [Route("delete")]
        public bool Delete([FromBody] RentsDTO c)
        {
            if (c == null) return false;
            return rbl.Delete(c);
        }

        // 8. רכבים פנויים בין תאריכים
        [HttpGet]
        [Route("getavailablecarsbetweendates/{startDate}/{endDate}")]
        public List<CarsDTO> GetAvailableCarsBetweenDates(DateTime startDate, DateTime endDate)
        {
            return rbl.GetAvailableCarsBetweenDates(startDate, endDate);
        }
    }
}