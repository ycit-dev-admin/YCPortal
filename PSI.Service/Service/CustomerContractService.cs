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
    public class CustomerContractService : ICustomerContractService
    {
        private readonly IUnitOfWork _unitOfwork;
        private readonly IGenericRepository<CustomerInfo> _customerInfoRepository;
        private readonly IGenericRepository<CustomerContract> _customerContractRepository;
        private readonly IGenericRepository<CustomerContractLog> _customerContractLogRepository;
        private readonly IGenericRepository<CustomerCar> _customerCarRepository;
        private readonly IGenericRepository<CodeTable> _codeTableRepository;


        public CustomerContractService(IUnitOfWork unitOfWork)
        {
            _unitOfwork = unitOfWork;
            _customerInfoRepository = _unitOfwork.CustomerInfoRepository;
            _customerContractRepository = _unitOfwork.CustomerContractRepository;
            _customerContractLogRepository = _unitOfwork.CustomerContractLogRepository;
            _customerCarRepository = _unitOfwork.CustomerCarRepository;
            _codeTableRepository = _unitOfwork.CodeTableRepository;
        }

        public IQueryable<CustomerContractEnum.Types> GetPurchaseContractTypes()
        {

            return new[] { CustomerContractEnum.Types.Purchase }.AsQueryable();

            //var(CustomerContractEnum.Status)aa.CONTRACT_STATU;

            //var abc = needStatus.Select(aa =>)
            //return typeof(CustomerContractEnum.Types).GetAllFieldInfo()
            //    .Where(fieldInfo => CustomerContractEnum.Types).Select(item =>
            // item.GetRawConstantValue().ToString()).AsQueryable();
        }

        public IEnumerable<CustomerContract> GetCustomerContractsByCustomerId(Guid customerId)
        {
            var queryRs = _customerContractRepository.GetAllAsync().Result
                                                     .Where(aa => aa.CONTRACT_GUID == customerId);
            return queryRs;
        }

        public IQueryable<CustomerContract> GetEffectiveCustomerContracts()
        {
            var needStatus = new[] { CustomerContractEnum.Status.Ongoing,
                CustomerContractEnum.Status.Completed,
            CustomerContractEnum.Status.ForceCompleted};
            var queryRs = _customerContractRepository.GetAllAsync().Result
                                                     .Where(aa => needStatus.Contains((CustomerContractEnum.Status)aa.CONTRACT_STATUS)).AsQueryable();
            return queryRs;
        }

        public IQueryable<CustomerContract> GetPurchaseCustomerContracts()
        {
            var needStatus = new[] { CustomerContractEnum.Status.Ongoing };
            var purchaseContractTypes = this.GetPurchaseContractTypes();

            var queryRs = _customerContractRepository.GetAllAsync().Result
                                                     .Where(aa => needStatus.Contains((CustomerContractEnum.Status)aa.CONTRACT_STATUS) &&
                                                     purchaseContractTypes.Contains((CustomerContractEnum.Types)aa.CONTRACT_TYPE))
                                                     .AsQueryable();
            return queryRs;
        }

        public FunctionResult<CustomerContract> CreateCustomerContract(CustomerContract customerContract, AppUser operUser)
        {
            var funcRs = new FunctionResult<CustomerContract>();
            if (operUser != null)
            {
                customerContract.CONTRACT_GUID = Guid.NewGuid();
                customerContract.CREATE_EMPNO = operUser.NickName;
                customerContract.CREATE_TIME = DateTime.Now;
                customerContract.UPDATE_EMPNO = operUser.NickName;
                customerContract.UPDATE_TIME = DateTime.Now;


                var creaetRs = _customerContractRepository.Create(customerContract);

                if (!creaetRs.Success)
                {
                    funcRs.ResultFailure(creaetRs.ActionMessage);
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

                funcRs.ResultSuccess("新增客戶資料成功!!", customerContract);
            }
            else
            {
                funcRs.ResultFailure("無客戶資料可新增!!");
            }
            return funcRs;
        }

        public CustomerContract GetCustomerContract(Guid unid)
        {
            return _customerContractRepository.GetAsync(aa => aa.CONTRACT_GUID == unid).Result;
        }

        public FunctionResult<CustomerContract> UpdateCustomerContract(CustomerContract customerContract, AppUser operUser)
        {
            var funcRs = new FunctionResult<CustomerContract>();
            if (customerContract == null)
            {
                funcRs.ResultFailure("無更新資料傳入!!");
                return funcRs;
            }
            var dbCustomerContract = _customerContractRepository.GetAsync(item => item.CONTRACT_GUID == customerContract.CONTRACT_GUID).Result;
            if (dbCustomerContract == null)
            {
                funcRs.ResultFailure("查無此筆資料!!");
                return funcRs;
            }

            // update logic
            var noUpdateFields = new[] { nameof(CustomerContract.ID),
                        nameof(CustomerContract.CREATE_EMPNO),
                        nameof(CustomerContract.CREATE_TIME),
            customerContract.CUSTOMER_GUID == Guid.Empty? nameof(CustomerContract.CUSTOMER_GUID):null,
            customerContract.PRODUCT_GUID == Guid.Empty? nameof(CustomerContract.PRODUCT_GUID):null,
            customerContract.DEAL_WEIGHT == 0? nameof(CustomerContract.DEAL_WEIGHT):null,
            customerContract.DEAL_UNIT_PRICE == 0? nameof(CustomerContract.DEAL_UNIT_PRICE):null,
            customerContract.START_DATETIME == default(DateTime)?nameof(CustomerContract.START_DATETIME):null,
            customerContract.END_DATETIME == default(DateTime)?nameof(CustomerContract.END_DATETIME):null,
            customerContract.DEAL_UNIT_PRICE == 0? nameof(CustomerContract.DEAL_UNIT_PRICE):null,
            customerContract.CONTRACT_STATUS == 0? nameof(CustomerContract.CONTRACT_STATUS):null
            }.Where(aa => aa != null).ToList();


            customerContract.UPDATE_EMPNO = operUser.NickName;
            customerContract.UPDATE_TIME = DateTime.Now;

            var upDbEntity = typeof(CustomerContract).ToUpdateEntityByNoNeed(
            customerContract,
            dbCustomerContract,
            noUpdateFields);



            funcRs = _customerContractRepository.Update(upDbEntity);
            funcRs.ResultSuccess("更新客戶資料成功!!", upDbEntity);
            return funcRs;
        }
    }
}
