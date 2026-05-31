using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;

namespace DAL // חייב להיות זהה ל-namespace שראינו בקוד ששלחת עכשיו
{
    public class DBConection
    {
        public List<T> GetDbSet<T>() where T : class
        {
            // עכשיו CarsDBEntities1 מוכר ע"י המערכת
            using (CarsDBEntities1 db = new CarsDBEntities1())
            {
                return db.Set<T>().ToList();
            }
        }

        public enum ExecuteActions { Insert, Update, Delete }

        public void Execute<T>(T entity, ExecuteActions exAction) where T : class
        {
            using (CarsDBEntities1 db = new CarsDBEntities1())
            {
                var model = db.Set<T>();
                switch (exAction)
                {
                    case ExecuteActions.Insert:
                        model.Add(entity);
                        break;
                    case ExecuteActions.Update:
                        db.Entry(entity).State = EntityState.Modified;
                        break;
                    case ExecuteActions.Delete:
                        db.Entry(entity).State = EntityState.Deleted;
                        break;
                }
                db.SaveChanges();
            }
        }
    }
}