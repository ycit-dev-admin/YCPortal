using PSI.Core.Entities;
using PSI.Core.Interfaces.Repository;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Service.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PSI.Service.Service
{
    public class CustomerService : ICustomerService
    {
        private readonly IUnitOfWork _unitOfwork;
        private readonly IGenericRepository<CustomerInfo> _customerInfoRepository;

        public CustomerService(IUnitOfWork unitOfWork)
        {
            _unitOfwork = unitOfWork;
            _customerInfoRepository = _unitOfwork.CustomerInfoRepository;
        }


        public IEnumerable<CustomerInfo> GetCustomerInfosByPsiType(string psiType)
        {
            var queryRs = _customerInfoRepository.GetAllAsync().Result
                                            .Where(aa => aa.PsiType == psiType &&
                                                         aa.IsShow == "1");
            return queryRs;
        }
    }
}
