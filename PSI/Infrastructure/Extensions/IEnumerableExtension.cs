using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace PSI.Infrastructure.Extensions
{
    public static class IEnumerableExtension
    {
        public static List<SelectListItem> ToPageSelectList<T>(this IEnumerable<T> source, string textName, string valueName)
        {
            var argType = typeof(T);
            return source.Select(item => new SelectListItem
            {
                Text = argType.GetProperty(textName).GetValue(item).ToString(),
                Value = argType.GetProperty(valueName).GetValue(item).ToString()
            }).ToList();

        }
    }
}
