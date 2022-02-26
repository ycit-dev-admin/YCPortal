using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using PSI.Areas.Purchase.Models.IVE_Models;
using PSI.Core.Entities;

namespace PSI.Areas.Purchase.Helpers
{
    public class PurchaseDTEHelper
    {
        public PurchaseDTEHelper()
        {
        }
        public PurchaseWeightNote GetProdcutItem(IVE_PurchaseWeightNote_Edit testVeModel) // 實付金額 = (磅費 + 計價金額 + 運費)
        {

            var config = new MapperConfiguration(cfg =>
                cfg.CreateMap<IVE_PurchaseWeightNote_Edit, PurchaseWeightNote>()
                 .ForMember(x => x.DocNo, y => y.MapFrom(o => o.CarNo)).ReverseMap());


            return config.CreateMapper().Map<PurchaseWeightNote>(testVeModel);
        }
    }
}
