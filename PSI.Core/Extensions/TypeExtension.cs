using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace PSI.Core.Extensions
{
    public static class TypeExtension
    {
        public static T ToUpdateEntity<T>(this Type source, T sourceEntity, T dbEntity, string[] onlyUpdatePropertyNames)
        {
            foreach (var propertyInfo in typeof(T).GetProperties().Where(aa => onlyUpdatePropertyNames.Contains(aa.Name)))
            {
                propertyInfo.SetValue(dbEntity, propertyInfo.GetValue(sourceEntity));
            }
            return dbEntity;
        }

        public static T ToUpdateEntityByNoNeed<T>(this Type source, T sourceEntity, T dbEntity, string[] noUpdatePropertyNames)
        {
            foreach (var propertyInfo in typeof(T).GetProperties().Where(aa => !noUpdatePropertyNames.Contains(aa.Name)))
            {
                propertyInfo.SetValue(dbEntity, propertyInfo.GetValue(sourceEntity));
            }
            return dbEntity;
        }
    }
}
