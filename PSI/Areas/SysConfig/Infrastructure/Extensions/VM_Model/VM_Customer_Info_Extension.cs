using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Areas.SysConfig.Models;
using PSI.Core.Enums;
using PSI.Infrastructure.Extensions;

namespace PSI.Areas.SysConfig.Infrastructure.Extensions.VM_Model
{
    public static class VM_Customer_Info_Extension
    {
        public static VM_Customer_Info IniPageModel(this VM_Customer_Info vmCustomerInfo)
        {
            vmCustomerInfo.PsiTypeItems = typeof(PSIEnum.PSIType).GetAllFieldInfo().Select(field => new SelectListItem
            {
                Text = ((PSIEnum.PSIType)Enum.Parse(typeof(PSIEnum.PSIType), field.Name)).GetDescription(),
                Value = field.GetRawConstantValue().ToString()
            }).ToList();

            return vmCustomerInfo;
        }
    }
}
