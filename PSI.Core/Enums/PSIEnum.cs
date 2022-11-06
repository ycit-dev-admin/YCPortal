using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;

namespace PSI.Core.Enums
{
    public class PSIEnum
    {
        public enum PSIType
        {
            [Description("進貨")]
            Purchase = 1,
            [Description("出貨")]
            Sale = 2,
            [Description("進出貨")]
            Both = 5,
            [Description("原群集團")]
            Inside = 9

        }
        public enum FacSite
        {
            [Description("西圳廠")]
            A = 1,
            [Description("龜山廠")]
            B = 2
        }


        public static IQueryable<PSIEnum.PSIType> GetSalesPsiTypes()
        {
            return new[] { PSIEnum.PSIType.Sale,
                PSIEnum.PSIType.Both,
                PSIEnum.PSIType.Inside}.AsQueryable();
        }
        public static IQueryable<PSIEnum.PSIType> GetPurchasePsiTypes()
        {
            return new[] { PSIEnum.PSIType.Purchase,
                PSIEnum.PSIType.Both }.AsQueryable();
        }

        public static IQueryable<PSIEnum.PSIType> GetAllPsiTypes()
        {
            return Enum.GetValues(typeof(PSIEnum.PSIType))
                       .Cast<PSIEnum.PSIType>().AsQueryable();
        }

        public static IQueryable<PSIEnum.FacSite> GetAllFacSites()
        {
            return Enum.GetValues(typeof(PSIEnum.FacSite))
                        .Cast<PSIEnum.FacSite>().AsQueryable();
        }



    }
}
