using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Areas.SysConfig.Models;
using PSI.Core.Enums;
using PSI.Infrastructure.Extensions;

namespace PSI.Areas.SysConfig.Infrastructure.Extensions.VM_Model
{
    public static class VM_Create_CustomerInfoExtension
    {
        public static VM_Create_CustomerInfo SetPsiTypeItems(this VM_Create_CustomerInfo vmCustomerInfo, string selectedValue = "")
        {
            vmCustomerInfo.PagePsiTypeItems = typeof(PSIEnum.PSIType).GetAllFieldInfo().Select(field => new SelectListItem
            {
                Text = ((PSIEnum.PSIType)Enum.Parse(typeof(PSIEnum.PSIType), field.Name)).GetDescription(),
                Value = field.GetRawConstantValue().ToString(),
                Selected = !string.IsNullOrEmpty(selectedValue)
                            && selectedValue == field.GetRawConstantValue().ToString()
            }).ToList();

            return vmCustomerInfo;
        }
    }
}
