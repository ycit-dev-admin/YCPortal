using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PSI.Core.Infrastructure.DBContext;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PSI.Service.IService;
using PSI.Service.Service;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Core.UnitOfWorks;
using PSI.Core.Entities;
using PSI.Core.Interfaces.Repository;
using PSI.Core.Repositorys;
using FluentValidation.AspNetCore;
using PSI.VM_Models.PurchaseWeightNote;
using FluentValidation;
using PSI.VM_Models.Home;
using FormHelper;

namespace PSI
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews()
                    .AddFluentValidation(s => s.RunDefaultMvcValidationAfterFluentValidationExecutes = false)
                    .AddFormHelper();// 似乎是可以讓該專案使用Controller的相關功能 如驗證 及 View帶有Razor Page開發風格

            services.AddTransient<IValidator<VM_PurchaseWeightNote>, VM_PurchaseWeightNoteValidator>();
            services.AddTransient<IValidator<TestVM>, TestVMValidator>();
            //services.AddTransient<PsiService>(new PsiService());
            //services.AddScoped<IPsiService, PsiService>();
            services.AddScoped<IPsiService, PsiService>();
            services.AddScoped<IGenericRepository<PurchaseWeightNote>, GenericRepository<PurchaseWeightNote>>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<DbContext, MyContext>();
            services.AddDbContext<MyContext>(options =>
            {
                options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseDefaultFiles();  // 可以指定預設頁面可搜尋MSDN了解細節
            app.UseStaticFiles();  //主要是要讓專案可以讀wwwrot內的靜態檔案
            app.UseFormHelper();
            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                //endpoints.MapGet("/", async context =>
                //{
                //    await context.Response.WriteAsync("Hello World!");
                //});

                // 似乎為定義MVC的Router的方式
                endpoints.MapControllerRoute(
                   name: "default",
                   pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
