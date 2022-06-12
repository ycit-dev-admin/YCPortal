using System;
using System.Collections.Generic;
using System.Linq;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Enums;
using PSI.Core.Extensions;
using PSI.Core.Helpers;
using PSI.Core.Interfaces.Repository;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Service.IService;

namespace PSI.Service.Service
{
    public class CustomerInfoService : ICustomerInfoService
    {
        private readonly IUnitOfWork _unitOfwork;
        private readonly ICodeTableService _codeTableService;
        private readonly IGenericRepository<CustomerInfo> _customerInfoRepository;
        private readonly IGenericRepository<CustomerContract> _customerContractRepository;
        private readonly IGenericRepository<CustomerContractLog> _customerContractLogRepository;
        private readonly IGenericRepository<CustomerCar> _customerCarRepository;
        private readonly IGenericRepository<CodeTable> _codeTableRepository;


        public CustomerInfoService(IUnitOfWork unitOfWork,
            ICodeTableService codeTableService)
        {
            _unitOfwork = unitOfWork;
            _codeTableService = codeTableService;
            _customerInfoRepository = _unitOfwork.CustomerInfoRepository;
            _customerContractRepository = _unitOfwork.CustomerContractRepository;
            _customerContractLogRepository = _unitOfwork.CustomerContractLogRepository;
            _customerCarRepository = _unitOfwork.CustomerCarRepository;
            _codeTableRepository = _unitOfwork.CodeTableRepository;
        }

        public IQueryable<CustomerInfo> GetPurchaseCustomerInfo(IPSIEnumService iPSIEnumService)
        {
            var purchaseTypes = iPSIEnumService.GetPurchasePsiTypes().Select(aa => (int)aa);
            var salesTypes = iPSIEnumService.GetSalesPsiTypes()
                .Select(aa => (int)aa);

            return _customerInfoRepository.GetAllAsync().Result.
                   Where(aa => aa.IS_EFFECTIVE == "1" &&
                   purchaseTypes.Contains(aa.PSI_TYPE.Value)).AsQueryable();
        }

        public IQueryable<CustomerInfo> GetSalesCustomerInfo(IPSIEnumService iPSIEnumService)
        {
            var salesTypes = iPSIEnumService.GetSalesPsiTypes()
                .Select(aa => (int)aa);

            return _customerInfoRepository.GetAllAsync().Result.
                   Where(aa => aa.IS_EFFECTIVE == "1" &&
                   salesTypes.Any(bb => bb == aa.PSI_TYPE)).AsQueryable();
        }

        public FunctionResult<CustomerInfo> CreateCustomerInfoForNormal(CustomerInfo customerInfo, AppUser operUser)
        {
            var funcRs = new FunctionResult<CustomerInfo>();
            if (operUser != null)
            {
                customerInfo.CUSTOMER_GUID = Guid.NewGuid();
                customerInfo.CREATE_EMPNO = operUser.NICK_NAME;
                customerInfo.CREATE_TIME = DateTime.Now;
                customerInfo.UPDATE_EMPNO = operUser.NICK_NAME;
                customerInfo.UPDATE_TIME = DateTime.Now;
                customerInfo.IS_EFFECTIVE = "1";
                //customerInfo.IS_CONTRACT = false;

                var cCustomerInfoRs = _customerInfoRepository.Create(customerInfo);

                if (!cCustomerInfoRs.Success)
                {
                    funcRs.ResultFailure(cCustomerInfoRs.ActionMessage);
                    return funcRs;
                }

                //if (cCustomerInfoRs.Success && customerCars != null && customerCars.Any())
                //{
                //    customerCars = customerCars.Select(aa =>
                //    {
                //        aa.IS_EFFECTIVE = "1";
                //        aa.CREATE_EMPNO = operUser.NickName;
                //        aa.CREATE_TIME = DateTime.Now;
                //        aa.UPDATE_EMPNO = operUser.NickName;
                //        aa.UPDATE_TIME = DateTime.Now;
                //        aa.CUSTOMER_GUID = customerInfo.CUSTOMER_GUID;
                //        return aa;
                //    }).ToList();
                //    _customerCarRepository.Create(customerCars);
                //}

                funcRs.ResultSuccess("新增客戶資料成功!!", customerInfo);
            }
            else
            {
                funcRs.ResultFailure("無客戶資料可新增!!");
            }
            return funcRs;
        }

        public FunctionResult<CustomerInfo> UpdateCustomerInfo(CustomerInfo customerInfo, AppUser operUser)
        {
            var funcRs = new FunctionResult<CustomerInfo>();
            if (customerInfo == null)
            {
                funcRs.ResultFailure("無更新資料傳入!!");
                return funcRs;
            }
            var dbCustomerInfo = _customerInfoRepository.GetAsync(item => item.CUSTOMER_GUID == customerInfo.CUSTOMER_GUID).Result;
            if (dbCustomerInfo == null)
            {
                funcRs.ResultFailure("查無此筆資料!!");
                return funcRs;
            }

            // update logic
            customerInfo.UPDATE_EMPNO = operUser.NICK_NAME;
            customerInfo.UPDATE_TIME = DateTime.Now;

            var upDbEntity = typeof(CustomerInfo).ToUpdateEntityByNoNeed(
                customerInfo,
                dbCustomerInfo,
                new List<string>{ nameof(CustomerInfo.ID),
                        nameof(CustomerInfo.CUSTOMER_GUID),
                        nameof(CustomerInfo.CREATE_EMPNO),
                        nameof(CustomerInfo.CREATE_TIME),
                        nameof(CustomerInfo.IS_EFFECTIVE) });



            funcRs = _customerInfoRepository.Update(upDbEntity);
            funcRs.ResultSuccess("更新客戶資料成功!!", upDbEntity);
            return funcRs;
        }



        public IQueryable<CustomerInfo> GetCustomerInfos()
        {
            // var curUser = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext?.User);
            return _customerInfoRepository.GetAllAsync()
                                          .Result.Where(aa => aa.IS_EFFECTIVE == "1")
                                          .AsQueryable();
        }

        public CustomerInfo GetCustomerInfo(long id)
        {
            return _customerInfoRepository.GetAsync(aa => aa.ID == id).Result;
        }
        public CustomerInfo GetCustomerInfo(Guid guid)
        {
            return _customerInfoRepository.GetAsync(aa => aa.CUSTOMER_GUID == guid).Result;
        }
        public CustomerInfo GetCustomerInfoByCustomerName(string customerName)
        {
            return _customerInfoRepository.GetAsync(aa => aa.CUSTOMER_NAME == customerName).Result;
        }
        public CustomerInfo GetCustomerInfoByCompanyName(string companyName)
        {
            return _customerInfoRepository.GetAsync(aa => aa.COMPANY_NAME == companyName).Result;
        }
    }
}
