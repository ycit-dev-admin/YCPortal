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
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());  //���U�Ҧ�automapper Profile

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
                options.Password.RequiredLength = 6;     //�K�X�ܤ֭n6�Ӧr����
                options.Password.RequireNonAlphanumeric = false;  //���ݭn�Ÿ��r��
                options.Password.RequireUppercase = false;         //�n���j�g�^��r��
                options.Password.RequireLowercase = false;        //���@�w�n���p�g�^��r��


                options.SignIn.RequireConfirmedAccount = true;

                // Email settings
                options.User.RequireUniqueEmail = true;  //Email���୫��
            }).AddEntityFrameworkStores<LiteIdContext>();

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
            //app.UseFormHelper();  // �@�ӵ��Xjavascript �M FluentVailation���M��
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
                // Area��Route Setting
                endpoints.MapControllerRoute(
                   name: "MyArea",
                   pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}");

                // ���G���w�qMVC��Router���覡
                endpoints.MapControllerRoute(
                   name: "default",
                   pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapRazorPages();  //For DotNet core Identity pages
            });
        }
    }
}
