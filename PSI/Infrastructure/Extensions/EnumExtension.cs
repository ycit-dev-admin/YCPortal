using System;
using System.Reflection;
using System.ComponentModel;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PSI.Infrastructure.Extensions
{
    public static class EnumExtension
    {
        public static string GetDescription(this Enum source)
        {
            var fieldInfo = source.GetType().GetField(source.ToString());
            var attributes = (DescriptionAttribute[])fieldInfo.GetCustomAttributes(typeof(DescriptionAttribute), false);
            return attributes.Length > 0 ? attributes[0].Description : source.ToString();
        }
    }
}
