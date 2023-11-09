using System.IO;
using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
namespace Onboarding
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }
        // Adding services to the container 
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            //next folders will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "backofficemanager/build";
            });

        }
    }
}