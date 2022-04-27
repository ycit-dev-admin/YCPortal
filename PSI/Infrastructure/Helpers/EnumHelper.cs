using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Core.Enums;
using PSI.Infrastructure.Extensions;

namespace PSI.Infrastructure.Helpers
{
    public class EnumHelper
    {

        public EnumHelper()
        {
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
