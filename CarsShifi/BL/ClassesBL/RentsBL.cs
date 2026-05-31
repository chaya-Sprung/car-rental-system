using BL.ClassesDTO;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using static DAL.DBConection;

namespace BL.ClassesBL
{
    public class RentsBL
    {
        DBConection conn = new DBConection();

        public RentsDTO GetRentsById(int id)
        {
            var rent = conn.GetDbSet<Rents>().FirstOrDefault(c => c.rensCode == id);
            return Convert(rent);
        }

        public bool Add(RentsDTO c)
        {
            try
            {
                // 1. המרה מ-DTO לאובייקט DB
                // חשוב: ודאי שבפונקציית ה-Convert שמופיעה למטה בקובץ 
                // אין שורה שמעדכנת את rensCode
                Rents c1 = Convert(c);

                // 2. שימוש בחיבור המקורי של הפרויקט שלך
                conn.Execute<Rents>(c1, ExecuteActions.Insert);

                return true;
            }
            catch (Exception ex)
            {
                // אם זה נופל, השורה הזו תדפיס לחלון ה-Output (למטה) את הסיבה המדויקת
                System.Diagnostics.Debug.WriteLine("DEBUG ERROR: " + ex.GetBaseException().Message);
                return false;
            }
        }
        public bool Update(RentsDTO c)
        {
            try
            {
                Rents c1 = Convert(c);
                conn.Execute<Rents>(c1, ExecuteActions.Update);
                return true;
            }
            catch { return false; }
        }

        public bool Delete(RentsDTO c)
        {
            try
            {
                Rents c1 = Convert(c);
                conn.Execute<Rents>(c1, ExecuteActions.Delete);
                return true;
            }
            catch { return false; }
        }

        public int GetNext()
        {
            return conn.GetDbSet<Rents>().Count() + 1;
        }

        public List<RentsDTO> GetRents()
        {
            return Convert(conn.GetDbSet<Rents>().ToList());
        }

        public List<RentsDTO> GetRentsByCustomerId(int customerId)
        {
            // תיקון לוגי: סינון לפי ID של הלקוח
            var list = conn.GetDbSet<Rents>().Where(r => r.customerId == customerId).ToList();
            return Convert(list);
        }

        public List<RentsDTO> GetRentsByCarCode(int carCode)
        {
            var list = conn.GetDbSet<Rents>().Where(r => r.carCode == carCode).ToList();
            return Convert(list);
        }

        // --- מתודות המרה ---

        public RentsDTO Convert(Rents c)
        {
            if (c == null) return null;
            return new RentsDTO
            {
                rentCode = c.rensCode,
                customerId = c.customerId,
                carCode = c.carCode,
                beginDate = c.beginDate,
                finishDate = c.finishDate,
                rentGoal = c.rentGoal
            };
        }

        public Rents Convert(RentsDTO cdt)
        {
            if (cdt == null) return null;
            return new Rents
            {
                // לוודא שאין כאן שורה של rensCode!
                customerId = cdt.customerId,
                carCode = cdt.carCode,
                beginDate = cdt.beginDate,
                finishDate = cdt.finishDate,
                rentGoal = cdt.rentGoal
            };
        }
        public List<RentsDTO> Convert(List<Rents> list)
        {
            return list.Select(c => Convert(c)).ToList();
        }

        // --- פונקציות תאריכים נוספות ---
        public List<RentsDTO> GetRentsfromWeeek()
        {
            DateTime weekAgo = DateTime.Now.AddDays(-7);
            return Convert(conn.GetDbSet<Rents>().Where(r => r.beginDate >= weekAgo).ToList());
        }

        public List<CarsDTO> GetAvailableCarsBetweenDates(DateTime startDate, DateTime endDate)
        {
            CarsBL cbl = new CarsBL();
            var unavailableCarCodes = conn.GetDbSet<Rents>()
                .Where(r => r.beginDate < endDate && r.finishDate > startDate)
                .Select(r => r.carCode).Distinct().ToList();

            var allCars = cbl.Convert(conn.GetDbSet<Cars>().ToList());
            return allCars.Where(car => !unavailableCarCodes.Contains(car.carCode)).ToList();
        }
    }
}