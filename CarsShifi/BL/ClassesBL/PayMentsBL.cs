using BL.ClassesDTO;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DAL.DBConection;

namespace BL.ClassesBL
{
    public class PayMentsBL
    {
        DBConection conn = new DBConection();

        // שליפת תשלום לפי קוד
        public PayMentsDTO GetPaymentById(int id)
        {
            List<PayMentsDTO> list = Convert(conn.GetDbSet<PayMents>());
            return list.FirstOrDefault(c => c.paymentCode == id);
        }

        // הוספת תשלום חדש
        public bool Add(PayMentsDTO c)
        {
            try
            {
                PayMents c1 = Convert(c);
                conn.Execute<PayMents>(c1, ExecuteActions.Insert);
                return true;
            }
            catch (Exception ex)
            {
                // מדפיס את השגיאה האמיתית לחלון ה-Output ב-Visual Studio
                System.Diagnostics.Debug.WriteLine("Payment Add Error: " + ex.GetBaseException().Message);
                return false;
            }
        }

        // עדכון פרטי תשלום
        public bool Update(PayMentsDTO c)
        {
            try
            {
                PayMents c1 = Convert(c);
                conn.Execute<PayMents>(c1, ExecuteActions.Update);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        // מחיקת תשלום
        public bool Delete(PayMentsDTO c)
        {
            try
            {
                PayMents c1 = Convert(c);
                conn.Execute<PayMents>(c1, ExecuteActions.Delete);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        // שליפת כל התשלומים
        public List<PayMentsDTO> GetPayments()
        {
            return Convert(conn.GetDbSet<PayMents>());
        }

        // --- פונקציות המרה (Converters) ---

        // מה-Database ל-DTO (בשביל לשלוח לאנגולר)
        public PayMentsDTO Convert(PayMents c)
        {
            if (c == null) return null;
            return new PayMentsDTO()
            {
                creditCard = c.creditCard,
                validit = c.validit,
                cvc = (int)c.cvc // המרה ל-int במידה וב-DB הוא מסוג אחר
            };
        }

        // מה-DTO ל-Database (בשביל לשמור ב-SQL)
        public PayMents Convert(PayMentsDTO cdt)
        {
            if (cdt == null) return null;
            return new PayMents()
            {
                // שימי לב: השארתי את paymentCode בחוץ כי הוא IDENTITY ב-SQL
                creditCard = cdt.creditCard,
                validit = cdt.validit,
                cvc = cdt.cvc
            };
        }

        public List<PayMentsDTO> Convert(List<PayMents> list)
        {
            return list.Select(c => Convert(c)).ToList();
        }

        public List<PayMents> Convert(List<PayMentsDTO> list)
        {
            return list.Select(c => Convert(c)).ToList();
        }
    }
}