using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Core.Entities;
using PSI.Models.VEModels;
using PSI.Service.IService;

namespace PSI.Infrastructure.Helpers
{
    public class PageItemHelper
    {
        private readonly IMapper _mapper;
        public PageItemHelper(IMapper mapper)
        {
            _mapper = mapper;
        }

        public List<SelectListItem> PageGetCustomerInfoItems(ICustomerService customerService)
        {
            return customerService.GetPurchaseCustomerInfo()
                    .Select(aa => new SelectListItem
                    {
                        Text = aa.CUSTOMER_NAME,
                        Value = aa.ID.ToString()
                    }).ToList();
        }

    }
}
