using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using PSI.Areas.Purchase.Models.IVE_Models;
using PSI.Areas.Purchase.Models.PageModels;
using PSI.Core.Entities;

namespace PSI.Areas.Purchase.Helpers
{
    public class PurchaseMapperHelper
    {
        public PurchaseMapperHelper()
        {
        }

        public IMapper GetPageModelMapper<T1, T2>()
        {
            #region -- PurchaseWeightNote,PageWeightNoteEditWeightNote --        
            if (typeof(T1) == typeof(PurchaseWeightNote) &&
                typeof(T2) == typeof(PageWeightNoteEditWeightNote))
                return new MapperConfiguration(cfg =>
                   cfg.CreateMap<PurchaseWeightNote, PageWeightNoteEditWeightNote>()
                      .ForMember(t => t.DocNo, s => s.MapFrom(o => o.DOC_NO))
                      .ForMember(t => t.FullWeightTime, s => s.MapFrom(o => o.FULL_WEIGHT_TIME))
                      .ForMember(t => t.CustomerName, s => s.MapFrom(o => o.CUSTOMER_NAME))
                      .ForMember(t => t.CarNo, s => s.MapFrom(o => o.CAR_NO))
                      .ForMember(t => t.FullWeight, s => s.MapFrom(o => o.FULL_WEIGHT))
                      .ForMember(t => t.DefectiveWeight, s => s.MapFrom(o => o.DEFECTIVE_WEIGHT))
                      .ForMember(t => t.UnitPrice, s => s.MapFrom(o => o.UNIT_PRICE))
                      .ForMember(t => t.HasTax, s => s.MapFrom(o => o.HAS_TAX))
                      .ForMember(t => t.ScaleNo, s => s.MapFrom(o => o.SCALE_NO))
                      .ForMember(t => t.TraficUnitPrice, s => s.MapFrom(o => o.TRAFIC_UNIT_PRICE))
                      .ForMember(t => t.ThirdWeightFee, s => s.MapFrom(o => o.THIRD_WEIGHT_FEE))
                      .ForMember(t => t.WeightPrice, s => s.MapFrom(o => o.WEIGHT_PRICE))
                      .ForMember(t => t.DeliveryFee, s => s.MapFrom(o => o.DELIVERY_FEE))
                      .ForMember(t => t.ActualPrice, s => s.MapFrom(o => o.ACTUAL_PRICE))
                      .ForMember(t => t.PayTime, s => s.MapFrom(o => o.PAY_TIME))
                      .ForMember(t => t.Remark, s => s.MapFrom(o => o.REMARK))).CreateMapper();
            #endregion

            return null;



        }
    }
}
