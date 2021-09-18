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
using FormHelper;
using Microsoft.AspNetCore.Identity;

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

            //services.AddCors(options =>
            //{ 
            //    // CorsPolicy �O�ۭq�� Policy �W��
            //    options.AddPolicy("CorsPolicy", policy =>
            //    {
            //        policy.WithOrigins("http://localhost:3000")
            //              .AllowAnyHeader()
            //              .AllowAnyMethod()
            //              .AllowCredentials();
            //    });
            //});

            services.AddControllersWithViews() // ���G�O�i�H���ӱM�רϥ�Controller�������\�� �p���� �� View�a��Razor Page�}�o����
                    .AddFluentValidation(s => s.RunDefaultMvcValidationAfterFluentValidationExecutes = false)
                    .AddFormHelper();
            services.AddRazorPages();  // For Dotnet core identity
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddTransient<IValidator<VM_PurchaseWeightNote>, VM_PurchaseWeightNoteValidator>();
            //services.AddTransient<PsiService>(new PsiService());
            //services.AddScoped<IPsiService, PsiService>();
            services.AddScoped<IPsiService, PsiService>();
            services.AddScoped<IGenericRepository<PurchaseWeightNote>, GenericRepository<PurchaseWeightNote>>();
            services.AddScoped<IGenericRepository<CustomerInfo>, GenericRepository<CustomerInfo>>();
            services.AddScoped<IGenericRepository<CustomerCar>, GenericRepository<CustomerCar>>();
            services.AddScoped<IGenericRepository<CustomerContract>, GenericRepository<CustomerContract>>();
            services.AddScoped<IGenericRepository<ProductItem>, GenericRepository<ProductItem>>();
            services.AddScoped<ICustomerService, CustomerService>();
            services.AddScoped<IProductItemService, ProductItemService>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<DbContext, MyContext>();
            services.AddDbContext<MyContext>(options =>
            {
                options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddDbContext<IdentityContext>(options =>
            {
                options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<IdentityContext>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseDefaultFiles();  // �i�H���w�w�]���� �i�ۤv�h�j�MMSDN����T�F�ѲӸ`�Ϊk
            //app.UsePathBase(Configuration["pathBase"] ?? "/psi");
            app.UseStaticFiles();  //�D�n�O�n���M�ץi�HŪwwwrot�����R�A�ɮ�
            app.UseFormHelper();
            app.UseRouting();

            // For Dotnet core identity
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                //endpoints.MapGet("/", async context =>
                //{
                //    await context.Response.WriteAsync("Hello World!");
                //});

                // ���G���w�qMVC��Router���覡
                endpoints.MapControllerRoute(
                   name: "default",
                   pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapRazorPages();  //For DotNet core Identity pages
            });
        }
    }
}
