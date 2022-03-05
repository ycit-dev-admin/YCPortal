using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
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
                   Where(aa => aa.IsEffective == "1" &&
                   purchaseTypes.Contains(aa.PsiType)).AsQueryable();
        }
        public IEnumerable<CustomerContract> GetCustomerContractsByCustomerId(long customerId)
        {
            var queryRs = _customerContractRepository.GetAllAsync().Result
                                                     .Where(aa => aa.CustomerId == customerId &&
                                                            aa.IsEffective == "1");
            return queryRs;
        }
        public IQueryable<CustomerCar> GetCustomerCarBy(long customerId)
        {
            return _customerCarRepository.GetAllAsync().Result.
                   Where(aa => aa.CustomerId == customerId &&
                               aa.IsEffective == "1").AsQueryable();
        }

        public IEnumerable<CustomerContract> GetEffectiveCustomerContracts()
        {
            var queryRs = _customerContractRepository.GetAllAsync().Result
                                                     .Where(aa => aa.IsEffective == "1");
            return queryRs;
        }

        public FunctionResult CreateCustomerInfo(CustomerInfo customerInfo, List<CustomerCar> customerCars, AppUser operUser)
        {
            var funcRs = new FunctionResult();
            if (operUser != null)
            {
                customerInfo.CreateEmpNo = operUser.NickName;
                customerInfo.CreateTime = DateTime.Now;
                customerInfo.UpdateEmpNo = operUser.NickName;
                customerInfo.UpdateTime = DateTime.Now;
                customerInfo.IsContract = false;
                customerInfo.IsEffective = "1";

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
                        aa.IsEffective = "1";
                        aa.CreateEmpNo = operUser.NickName;
                        aa.CreateTime = DateTime.Now;
                        aa.UpdateEmpNo = operUser.NickName;
                        aa.UpdateTime = DateTime.Now;
                        aa.CustomerId = customerInfo.Id;
                        return aa;
                    }).ToList();
                    _customerCarRepository.Create(customerCars);
                }

                funcRs.ResultSuccess("新增客戶資料成功!!");
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
            var dbCustomerInfo = _customerInfoRepository.GetAsync(item => item.Id == customerInfo.Id).Result;
            if (dbCustomerInfo == null)
            {
                funcRs.ResultFailure("查無此筆資料!!");
                return funcRs;
            }

            // update logic
            var entityType = typeof(CustomerInfo);
            var noNeedPropertyNames = new List<string>() {
                nameof(CustomerInfo.Id),
                nameof(CustomerInfo.CreateTime),
                nameof(CustomerInfo.CreateEmpNo)
            };

            foreach (var item in entityType.GetProperties())
            {
                if (!noNeedPropertyNames.Contains(item.Name))
                {
                    var propertyItem = entityType.GetProperty(item.Name);
                    propertyItem.SetValue(dbCustomerInfo, propertyItem.GetValue(customerInfo));
                }
            }
            dbCustomerInfo.UpdateTime = DateTime.Now;
            dbCustomerInfo.UpdateEmpNo = appUser.UserName;


            funcRs = _customerInfoRepository.Update(dbCustomerInfo);

            return funcRs;
        }

        public FunctionResult<CustomerCar> CreateCustomerCar(CustomerCar customerCar, AppUser operUser)
        {
            // var curUserInfo = _userManager.GetUserAsync(_httpContextAccessor.HttpContext?.User).Result;
            var funcRs = new FunctionResult<CustomerCar>(this);
            if (customerCar != null)
            {
                customerCar.CreateEmpNo = operUser.NickName;
                customerCar.CreateTime = DateTime.Now;
                customerCar.UpdateEmpNo = operUser.NickName;
                customerCar.UpdateTime = DateTime.Now;
                customerCar.IsEffective = "1";


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

        public IQueryable<CustomerInfo> GetCustomerInfos()
        {
            // var curUser = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext?.User);
            return _customerInfoRepository.GetAllAsync()
                                          .Result
                                          .AsQueryable();
        }

        public CustomerInfo GetCustomerInfo(long id)
        {
            return _customerInfoRepository.GetAsync(aa => aa.Id == id).Result;
        }
    }
}
