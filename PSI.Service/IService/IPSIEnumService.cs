using System.Linq;
using PSI.Core.Enums;

namespace PSI.Service.IService
{
    public interface IPSIEnumService
    {
        // PSIEnum.PSIType        
        IQueryable<PSIEnum.PSIType> GetSalesPsiTypes();

    }
}
