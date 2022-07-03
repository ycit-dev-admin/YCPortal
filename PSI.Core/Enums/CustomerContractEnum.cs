using System;
using System.ComponentModel;
using System.Linq;

namespace PSI.Core.Enums
{
    public class CustomerContractEnum
    {
        public enum Status
        {
            [Description("生效中")]
            Ongoing = 1,
            [Description("已過期")]
            OverTime = 2,
            [Description("合約完成")]  // 正常完成
            Completed = 3,
            [Description("強制完成")]
            ForceCompleted = 9
        }
        public enum Types
        {
            [Description("進貨合約")]
            Purchase = 0,
            [Description("出貨合約")]
            Sale = 1,
        }

        public static IQueryable<CustomerContractEnum.Status> GetContracOngoStatus()
        {
            return new[] { CustomerContractEnum.Status.Ongoing }.AsQueryable();
        }

        public static IQueryable<CustomerContractEnum.Types> GetPurchaseContractTypes()
        {
            var needTypes = new[] { CustomerContractEnum.Types.Purchase };
            return GetAllContractTypes().Where(aa => needTypes.Contains(aa));
        }
        public static IQueryable<CustomerContractEnum.Types> GetSaleContractTypes()
        {
            var needTypes = new[] { CustomerContractEnum.Types.Sale };
            return GetAllContractTypes().Where(aa => needTypes.Contains(aa));
        }

        public static IQueryable<CustomerContractEnum.Types> GetAllContractTypes()
        {
            return Enum.GetValues(typeof(CustomerContractEnum.Types))
                      .Cast<CustomerContractEnum.Types>().AsQueryable();
        }
    }
}
