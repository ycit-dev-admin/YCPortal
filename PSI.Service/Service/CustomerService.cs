using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Extensions;
using PSI.Core.Helpers;
using PSI.Core.Interfaces.Repository;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Service.IService;

namespace PSI.Service.Service
{
    public class CustomerService : ICustomerService
    {
        private readonly IUnitOfWork _unitOfwork;
        private readonly IGenericRepository<CustomerInfo> _customerInfoRepository;
        private readonly IGenericRepository<CustomerContract> _customerContractRepository;
        private readonly IGenericRepository<CustomerCar> _customerCarRepository;
        private readonly IGenericRepository<CodeTable> _codeTableRepository;

        public CustomerService(IUnitOfWork unitOfWork)
        {
            _unitOfwork = unitOfWork;
            _customerInfoRepository = _unitOfwork.CustomerInfoRepository;
            _customerContractRepository = _unitOfwork.CustomerContractRepository;
            _customerCarRepository = _unitOfwork.CustomerCarRepository;
            _codeTableRepository = _unitOfwork.CodeTableRepository;
        }

        public IQueryable<CustomerInfo> GetPurchaseCustomerInfo()
        {
            var purchaseTypes = new string[] { "1", "3" };

            return _customerInfoRepository.GetAllAsync().Result.
                   Where(aa => aa.IS_EFECTIVE == "1" &&
                   purchaseTypes.Contains(aa.PSI_TYPE)).AsQueryable();
        }
        public IEnumerable<CustomerContract> GetCustomerContractsByCustomerId(long customerId)
        {
            var queryRs = _customerContractRepository.GetAllAsync().Result
                                                     .Where(aa => aa.CustomerId == customerId &&
                                                            aa.IsEffective == "1");
            return queryRs;
        }
        public IQueryable<CustomerCar> GetCustomerCar(long customerId)
        {
            return _customerCarRepository.GetAllAsync().Result.
                   Where(aa => aa.CUSTOMER_ID == customerId &&
                               aa.IS_EFFECTIVE == "1").AsQueryable();
        }
        public IQueryable<CustomerCar> GetCustomerCar(Guid customerGUID)
        {
            return _customerCarRepository.GetAllAsync().Result.
                   Where(aa => aa.CUSTOMER_GUID == customerGUID &&
                               aa.IS_EFFECTIVE == "1").AsQueryable();
        }
        public IQueryable<CustomerCar> GetCustomerCars()
        {
            return _customerCarRepository.GetAllAsync().Result.AsQueryable();
        }

        public IEnumerable<CustomerContract> GetEffectiveCustomerContracts()
        {
            var queryRs = _customerContractRepository.GetAllAsync().Result
                                                     .Where(aa => aa.IsEffective == "1");
            return queryRs;
        }

        public FunctionResult<CustomerInfo> CreateCustomerInfo(CustomerInfo customerInfo, List<CustomerCar> customerCars, AppUser operUser)
        {
            var funcRs = new FunctionResult<CustomerInfo>();
            if (operUser != null)
            {
                customerInfo.CUSTOMER_GUID = Guid.NewGuid();
                customerInfo.CREATE_EMPNO = operUser.NickName;
                customerInfo.CREATE_TIME = DateTime.Now;
                customerInfo.UPDATE_EMPNO = operUser.NickName;
                customerInfo.UPDATE_TIME = DateTime.Now;
                customerInfo.IS_CONTRACT = false;
                customerInfo.IS_EFECTIVE = "1";

                var cCustomerInfoRs = _customerInfoRepository.Create(customerInfo);

                if (!cCustomerInfoRs.Success)
                {
                    funcRs.ResultFailure(cCustomerInfoRs.ActionMessage);
                    return funcRs;
                }

                if (cCustomerInfoRs.Success && customerCars != null && customerCars.Any())
                {
                    customerCars = customerCars.Select(aa =>
                    {
                        aa.IS_EFFECTIVE = "1";
                        aa.CREATE_EMPNO = operUser.NickName;
                        aa.CREATE_TIME = DateTime.Now;
                        aa.UPDATE_EMPNO = operUser.NickName;
                        aa.UPDATE_TIME = DateTime.Now;
                        aa.CUSTOMER_GUID = customerInfo.CUSTOMER_GUID;
                        return aa;
                    }).ToList();
                    _customerCarRepository.Create(customerCars);
                }

                funcRs.ResultSuccess("新增客戶資料成功!!", customerInfo);
            }
            else
            {
                funcRs.ResultFailure("無客戶資料可新增!!");
            }
            return funcRs;
        }

        public FunctionResult<CustomerInfo> UpdateCustomerInfo(CustomerInfo customerInfo, AppUser appUser)
        {
            var funcRs = new FunctionResult<CustomerInfo>();
            if (customerInfo == null)
            {
                funcRs.ResultFailure("無更新資料傳入!!");
                return funcRs;
            }
            var dbCustomerInfo = _customerInfoRepository.GetAsync(item => item.ID == customerInfo.ID).Result;
            if (dbCustomerInfo == null)
            {
                funcRs.ResultFailure("查無此筆資料!!");
                return funcRs;
            }

            // update logic
            var entityType = typeof(CustomerInfo);
            var noNeedPropertyNames = new List<string>() {
                nameof(CustomerInfo.ID),
                nameof(CustomerInfo.CREATE_TIME),
                nameof(CustomerInfo.CREATE_EMPNO)
            };

            foreach (var item in entityType.GetProperties())
            {
                if (!noNeedPropertyNames.Contains(item.Name))
                {
                    var propertyItem = entityType.GetProperty(item.Name);
                    propertyItem.SetValue(dbCustomerInfo, propertyItem.GetValue(customerInfo));
                }
            }
            dbCustomerInfo.UPDATE_TIME = DateTime.Now;
            dbCustomerInfo.UPDATE_EMPNO = appUser.UserName;


            funcRs = _customerInfoRepository.Update(dbCustomerInfo);

            return funcRs;
        }

        public FunctionResult<CustomerCar> CreateCustomerCar(CustomerCar customerCar, AppUser operUser)
        {
            // var curUserInfo = _userManager.GetUserAsync(_httpContextAccessor.HttpContext?.User).Result;
            var funcRs = new FunctionResult<CustomerCar>(this);
            if (customerCar != null)
            {
                customerCar.CAR_GUID = Guid.NewGuid();
                customerCar.CREATE_EMPNO = operUser.NickName;
                customerCar.CREATE_TIME = DateTime.Now;
                customerCar.UPDATE_EMPNO = operUser.NickName;
                customerCar.UPDATE_TIME = DateTime.Now;
                customerCar.IS_EFFECTIVE = "1";
                customerCar.CAR_NAME = customerCar.CAR_NAME.ToUpper();

                var createRs = _customerCarRepository.Create(customerCar);

                if (!createRs.Success)
                {
                    funcRs.ResultFailure(createRs.ActionMessage);
                    return funcRs;
                }

                funcRs.ResultSuccess("新增客戶資料成功!!", customerCar);
            }
            else
            {
                funcRs.ResultFailure("無客戶資料可新增!!");
            }
            return funcRs;
        }

        public FunctionResult<CustomerCar> UpdateCustomerCar(CustomerCar sourceEntity, AppUser operUser)
        {
            // var curUserInfo = _userManager.GetUserAsync(_httpContextAccessor.HttpContext?.User).Result;
            var funcRs = new FunctionResult<CustomerCar>(this);
            if (sourceEntity != null)
            {
                sourceEntity.UPDATE_EMPNO = operUser.NickName;
                sourceEntity.UPDATE_TIME = DateTime.Now;
                sourceEntity.CAR_NAME = sourceEntity.CAR_NAME.ToUpper();

                var dbEntity = _customerCarRepository.GetAsync(
                    aa => aa.CAR_GUID == sourceEntity.CAR_GUID).Result;
                var upDbEntity = typeof(CustomerCar).ToUpdateEntity(
                    sourceEntity,
                    dbEntity,
                    new[] { nameof(CustomerCar.CUSTOMER_GUID),
                            nameof(CustomerCar.CAR_NAME),
                            nameof(CustomerCar.REMARK),
                            nameof(CustomerCar.UPDATE_EMPNO),
                            nameof(CustomerCar.UPDATE_TIME)});


                var updateRs = _customerCarRepository.Update(upDbEntity);

                if (!updateRs.Success)
                {
                    funcRs.ResultFailure(updateRs.ActionMessage);
                    return funcRs;
                }

                funcRs.ResultSuccess("新增客戶資料成功!!", upDbEntity);
            }
            else
            {
                funcRs.ResultFailure("無客戶資料可新增!!");
            }
            return funcRs;
        }

        public IQueryable<CustomerInfo> GetCustomerInfos()
        {
            // var curUser = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext?.User);
            return _customerInfoRepository.GetAllAsync()
                                          .Result
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
    }
}
