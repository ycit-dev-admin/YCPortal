using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Core.Entities;
using PSI.Core.Enums;
using PSI.Infrastructure.Extensions;
using PSI.Models.VEModels;
using PSI.Service.IService;

namespace PSI.Infrastructure.Helpers
{
    public class EnumHelper
    {
        private readonly IMapper _mapper;
        public EnumHelper(IMapper mapper)
        {
            _mapper = mapper;
        }

        public List<SelectListItem> GetContractStatus(string selectedValue = "")
        {
            return typeof(CustomerContractEnum.Status).GetAllFieldInfo().Select(field => new SelectListItem
            {
                Text = ((CustomerContractEnum.Status)Enum.Parse(typeof(CustomerContractEnum.Status), field.Name)).GetDescription(),
                Value = field.GetRawConstantValue().ToString(),
                Selected = !string.IsNullOrEmpty(selectedValue)
                            && selectedValue == field.GetRawConstantValue().ToString()
            }).ToList();
        }

    }
}
