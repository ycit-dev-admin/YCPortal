using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace PSI.Infrastructure.Extensions
{
    public static class IEnumerableExtension
    {
        public static List<SelectListItem> ToPageSelectList<T>(this IEnumerable<T> source, string textName = "", string valueName = "", string selectedValue = "")
        {
            var argType = typeof(T);
            if (argType.IsEnum)
            {
                return source.Select(item => new SelectListItem
                {
                    // 參考 https://stackoverflow.com/questions/5097766/how-to-get-custom-attribute-values-for-enums

                    Text = argType.GetField(Enum.GetName(typeof(T), item)).GetCustomAttributes(false).OfType<DescriptionAttribute>().FirstOrDefault().Description,

                    Value = Convert.ToInt32(item).ToString(),
                    Selected = selectedValue == Convert.ToInt32(item).ToString()
                }).ToList();
            }

            return source.Select(item => new SelectListItem
            {
                Text = argType.GetProperty(textName).GetValue(item).ToString(),
                Value = argType.GetProperty(valueName).GetValue(item).ToString(),
                Selected = selectedValue == argType.GetProperty(valueName).GetValue(item).ToString()
            }).ToList();



        }
    }
}
