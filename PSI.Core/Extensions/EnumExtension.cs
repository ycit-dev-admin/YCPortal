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

        //public static List<string> GetDescription2<TEnum>(this Enum source)
        //{
        //    var qq = source.GetType();

        //    //var abc = Enum.GetValues(qq).Cast<TEnum>().Select(aa =>
        //    //new
        //    //{
        //    //    Text = Enum.GetName(typeof(TEnum), aa),
        //    //    Value = aa
        //    //});

        //    var abc = Enum.GetValues(qq).Cast<TEnum>().Select(aa => $@"{Enum.GetName(typeof(TEnum), aa)}__{aa}").ToList();


        //    return abc;
        //}
    }
}
