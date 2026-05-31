using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace API
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            // This is a Web API only project - disable MVC default route to prevent
            // the system from trying to load MVC views that don't exist
            // All API routes are defined in WebApiConfig.cs using attribute routing
        }
    }
}
