using System;
using AutoMapper;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Infrastructure.DBContext;
using PSI.Core.Interfaces.Repository;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Core.Repositorys;
using PSI.Core.UnitOfWorks;
using PSI.Helpers;
using PSI.Helpers.IHelper;
using PSI.Mappgins;
using PSI.Mappgins.Interface;
using PSI.Service.Helper;
using PSI.Service.IHelper;
using PSI.Service.ILogic;
using PSI.Service.IMapperProfile;
using PSI.Service.IService;
using PSI.Service.Logic;
using PSI.Service.MapActions;
using PSI.Service.MapperProfile;
using PSI.Service.Service;

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
            //    // CorsPolicy 是自訂的 Policy 名稱
            //    options.AddPolicy("CorsPolicy", policy =>
            //    {
            //        policy.WithOrigins("http://localhost:3000")
            //              .AllowAnyHeader()
            //              .AllowAnyMethod()
            //              .AllowCredentials();
            //    });
            //});

            services.AddControllersWithViews() // 似乎是可以讓該專案使用Controller的相關功能 如驗證 及 View帶有Razor Page開發風格
                    .AddFluentValidation(s => s.RunDefaultMvcValidationAfterFluentValidationExecutes = false); //.AddFormHelper();
            services.AddRazorPages();  // For Dotnet core identity
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            //services.AddTransient<IValidator<VE_PurchaseWeightNote>, WeightNoteCreateWeightNoteValidator>();
            //services.AddTransient<IValidator<Show_CustomerInfo>, VM_Create_CustomerInfoValidator>();
            //services.AddTransient<PsiService>(new PsiService());
            //services.AddScoped<IPsiService, PsiService>();

            services.AddScoped<IGenericRepository<PurchaseWeightNote>, GenericRepository<PurchaseWeightNote>>();
            services.AddScoped<IGenericRepository<CustomerInfo>, GenericRepository<CustomerInfo>>();
            services.AddScoped<IGenericRepository<CustomerCar>, GenericRepository<CustomerCar>>();
            services.AddScoped<IGenericRepository<CustomerContract>, GenericRepository<CustomerContract>>();
            services.AddScoped<IGenericRepository<CustomerContractLog>, GenericRepository<CustomerContractLog>>();
            services.AddScoped<IGenericRepository<ProductItem>, GenericRepository<ProductItem>>();
            services.AddScoped<IGenericRepository<CodeTable>, GenericRepository<CodeTable>>();
            services.AddScoped<IGenericRepository<PurchaseIngredient>, GenericRepository<PurchaseIngredient>>();
            services.AddScoped<IGenericRepository<SeqTypeConfig>, GenericRepository<SeqTypeConfig>>();
            services.AddScoped<IGenericRepository<SalesWeightNote>, GenericRepository<SalesWeightNote>>();
            services.AddScoped<IGenericRepository<SalesWeightNoteStepData>, GenericRepository<SalesWeightNoteStepData>>();
            services.AddScoped<IGenericRepository<SalesIngredient>, GenericRepository<SalesIngredient>>();
            //services.AddScoped<IGenericRepository<P_Inventory>, GenericRepository<P_Inventory>>();

            // IService
            services.AddScoped<IPsiService, PsiService>();
            services.AddScoped<ICustomerService, CustomerService>();
            services.AddScoped<IProductItemService, ProductItemService>();
            services.AddScoped<IProductItemServiceNew, ProductItemServiceNew>();
            services.AddScoped<ICodeTableService, CodeTableService>();
            services.AddScoped<ICodeTableServiceNew, CodeTableServiceNew>();
            services.AddScoped<ICustomerContractService, CustomerContractService>();
            services.AddScoped<ICustomerContractServiceNew, CustomerContractServiceNew>();
            services.AddScoped<IPSIEnumService, PSIEnumService>();
            services.AddScoped<ICustomerInfoService, CustomerInfoService>();
            services.AddScoped<ICustomerInfoServiceNew, CustomerInfoServiceNew>();
            services.AddScoped<ICustomerContractEnumService, CustomerContractEnumService>();
            services.AddScoped<ICarNoService, CarNoService>();
            services.AddScoped<ICarNoServiceNew, CarNoServiceNew>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<ISalesWeightNoteService, SalesWeightNoteService>();
            services.AddScoped<ISalesIngredientService, SalesIngredientService>();
            services.AddScoped<ISalesIngredientServiceNew, SalesIngredientServiceNew>();
            services.AddScoped<ISalesWeightNoteStepDataService, SalesWeightNoteResultPriceServiceNew>();
            services.AddScoped<ISalesWeightNoteResultPriceService, SalesWeightNoteResultPriceService>();
            services.AddScoped<IGenericService<P_Inventory>, GenericService<P_Inventory>>();

            //services.AddScoped<IGenericService<SalesWeightNote>, GenericService<SalesWeightNote>>();
            //services.AddScoped(typeof(IGenericService<>), typeof(GenericService<>));

            // ILogic
            services.AddScoped<ISalesWeightNoteLogic, SalesWeightNoteLogic>();
            services.AddScoped<IEntityMapperProfile, EntityMapperProfile>();



            // IHelper
            services.AddSingleton<ISalesPriceCaculateHelper, SalesPriceCaculateHelper>();
            services.AddSingleton<IWeightCaculateHelper, WeightCaculateHelper>();
            services.AddSingleton<IMapperHelper, MapperHelper>();
            services.AddSingleton<IMapperAllConfig, MapperAllConfig>();
            services.AddSingleton<IMapperConfigAction, WeightNoteCreateWeightNote_MapperConfig>();
            services.AddSingleton<IMapperConfig, MapperConfig>();

            // IMapper
            services.AddScoped<IPageModelMapper, PageModelMapper>();
            services.AddScoped<IMapperOfSalesWeightNote, MapperOfSalesWeightNote>();
            services.AddScoped<IMapperOfSalesIngredient, MapperOfSalesIngredient>();
            services.AddScoped<IMapperOfSalesWeightNoteResultPrice, MapperOfSalesWeightNoteResultPrice>();
            services.AddScoped<IPESalesWeightNoteMapper, MapperOfPE_SalesWeightNote>();
            services.AddScoped<IMapperOfPE_SalesIngredient, MapperOfPE_SalesIngredient>();


            // services.AddAutoMapper(typeof(Startup));            
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());  //註冊所有automapper Profile

            services.AddScoped<DbContext, MyContext>();
            services.AddDbContext<LiteContext>(options =>
            {
                //options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
                options.UseSqlite("Data Source = psiDev.db");
            });
            services.AddDbContext<MyContext>(options =>
            {
                options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
                //options.UseSqlite("Data Source = psiDev.db");
            });
            services.AddDbContext<LiteIdContext>(options =>
            {
                options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
                //options.UseSqlite("Data Source = psiDev.db");

            });
            services.AddDefaultIdentity<AppUser>(options =>
            {
                // Password settings              
                options.Password.RequiredLength = 6;     //密碼至少要6個字元長
                options.Password.RequireNonAlphanumeric = false;  //不需要符號字元
                options.Password.RequireUppercase = false;         //要有大寫英文字母
                options.Password.RequireLowercase = false;        //不一定要有小寫英文字母


                options.SignIn.RequireConfirmedAccount = true;

                // Email settings
                options.User.RequireUniqueEmail = true;  //Email不能重複
            }).AddEntityFrameworkStores<LiteIdContext>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseDefaultFiles();  // 可以指定預設頁面 可自己去搜尋MSDN的資訊了解細節用法
            //app.UsePathBase(Configuration["pathBase"] ?? "/psi");
            app.UseStaticFiles();  //主要是要讓專案可以讀wwwrot內的靜態檔案
            //app.UseFormHelper();  // 一個結合javascript 和 FluentVailation的套件
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
                // Area的Route Setting
                endpoints.MapControllerRoute(
                   name: "MyArea",
                   pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}");

                // 似乎為定義MVC的Router的方式
                endpoints.MapControllerRoute(
                   name: "default",
                   pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapRazorPages();  //For DotNet core Identity pages
            });
        }
    }
}
