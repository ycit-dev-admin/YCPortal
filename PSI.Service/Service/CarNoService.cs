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
    public class CarNoService : ICarNoService
    {
        private readonly IUnitOfWork _unitOfwork;
        private readonly IGenericRepository<CustomerCar> _customerCarRepository;


        public CarNoService(IUnitOfWork unitOfWork)
        {
            _unitOfwork = unitOfWork;
            _customerCarRepository = _unitOfwork.CustomerCarRepository;
        }


        public CustomerCar GetCustomerCarByUNID(Guid carNoUNID)
        {
            return _customerCarRepository.GetAllAsync().Result.
                   FirstOrDefault(aa => aa.CAR_GUID == carNoUNID &&
                               aa.IS_EFFECTIVE == "1");
        }
        public IQueryable<CustomerCar> GetCustomerCarByCustomerUNID(Guid customerGUID)
        {
            return _customerCarRepository.GetAllAsync().Result.
                   Where(aa => aa.CUSTOMER_GUID == customerGUID &&
                               aa.IS_EFFECTIVE == "1").AsQueryable();
        }
        public IQueryable<CustomerCar> GetSalesOfCarInfo(IPSIEnumService iPSIEnumService)
        {
            var salesStatus = iPSIEnumService.GetSalesPsiTypes()
                .Select(aa => (int)aa);
            return _customerCarRepository.GetAllAsync().Result.
                   Where(aa => salesStatus.Contains(aa.CAR_NO_TYPE) &&
                               aa.IS_EFFECTIVE == "1").AsQueryable();
        }
        public CustomerCar GetCustomerCar(string carNo)
        {
            return _customerCarRepository.GetAllAsync().Result
                   .FirstOrDefault(aa => aa.IS_EFFECTIVE == "1" &&
                   aa.CAR_NAME == carNo);
        }
        public IQueryable<CustomerCar> GetAllCustomerCars()
        {
            return _customerCarRepository.GetAllAsync().Result.Where(aa => aa.IS_EFFECTIVE == "1").AsQueryable();
        }


        public FunctionResult<CustomerCar> CreateCustomerCarForNormal(CustomerCar customerCar, AppUser operUser)
        {
            // var curUserInfo = _userManager.GetUserAsync(_httpContextAccessor.HttpContext?.User).Result;
            var funcRs = new FunctionResult<CustomerCar>(this);
            if (customerCar != null)
            {
                customerCar.CAR_GUID = Guid.NewGuid();
                customerCar.CREATE_EMPNO = operUser.NICK_NAME;
                customerCar.CREATE_TIME = DateTime.Now;
                customerCar.UPDATE_EMPNO = operUser.NICK_NAME;
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
                sourceEntity.UPDATE_EMPNO = operUser.NICK_NAME;
                sourceEntity.UPDATE_TIME = DateTime.Now;
                sourceEntity.CAR_NAME = sourceEntity.CAR_NAME.ToUpper();

                var dbEntity = _customerCarRepository.GetAsync(
                    aa => aa.CAR_GUID == sourceEntity.CAR_GUID).Result;
                var upDbEntity = typeof(CustomerCar).ToUpdateEntity(
                    sourceEntity,
                    dbEntity,
                    new List<string> { nameof(CustomerCar.CUSTOMER_GUID),
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


    }
}
