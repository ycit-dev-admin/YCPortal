using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace PSI.Infrastructure.Extensions
{
    public static class TypeExtension
    {
        public static List<FieldInfo> GetAllFieldInfo(this Type source)
        {
            return source.GetFields().Where(aa => aa.Name != "value__").ToList();
        }
    }
}
