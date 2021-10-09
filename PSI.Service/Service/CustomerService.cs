using System;
using System.Collections.Generic;
using System.Linq;
using PSI.Core.Entities;
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

        public CustomerService(IUnitOfWork unitOfWork)
        {
            _unitOfwork = unitOfWork;
            _customerInfoRepository = _unitOfwork.CustomerInfoRepository;
            _customerContractRepository = _unitOfwork.CustomerContractRepository;
            _customerCarRepository = _unitOfwork.CustomerCarRepository;
        }


        public IEnumerable<CustomerInfo> GetCustomerInfosByPsiType(string psiType)
        {
            var queryRs = _customerInfoRepository.GetAllAsync().Result
                                            .Where(aa => aa.PsiType == psiType &&
                                                         aa.IsEffective == "1");
            return queryRs;
        }
        public IEnumerable<CustomerContract> GetCustomerContractsByCustomerId(long customerId)
        {
            var queryRs = _customerContractRepository.GetAllAsync().Result
                                                     .Where(aa => aa.CustomerId == customerId &&
                                                            aa.IsEffective == "1");
            return queryRs;
        }
        public IEnumerable<CustomerCar> GetCustomerCarByCustomerId(long customerId)
        {
            var queryRs = _customerCarRepository.GetAllAsync().Result
                                                .Where(aa => aa.CustomerId == customerId &&
                                                             aa.IsEffective == "1");
            return queryRs;
        }

        public IEnumerable<CustomerContract> GetEffectiveCustomerContracts()
        {
            var queryRs = _customerContractRepository.GetAllAsync().Result
                                                     .Where(aa => aa.IsEffective == "1");
            return queryRs;
        }

        public FunctionResult CreateCustomerInfo(CustomerInfo customerInfo, List<CustomerCar> customerCars)
        {
            var funcRs = new FunctionResult();
            if (customerInfo != null)
            {
                customerInfo.CreateTime = DateTime.Now;
                customerInfo.UpdateTime = DateTime.Now;
                customerInfo.IsContract = false;
                customerInfo.IsEffective = "1";
                var cCustomerInfoRs = _customerInfoRepository.Create(customerInfo);

                if (!cCustomerInfoRs.Success)
                {
                    funcRs.ResultFailure(cCustomerInfoRs.ActionMessage);
                    return funcRs;
                }

                if (cCustomerInfoRs.Success && customerCars.Any())
                {
                    customerCars = customerCars.Select(aa =>
                    {
                        aa.CreateTime = DateTime.Now;
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
    }
}
