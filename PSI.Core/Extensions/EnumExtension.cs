using System;
using System.ComponentModel;

namespace PSI.Core.Extensions
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
