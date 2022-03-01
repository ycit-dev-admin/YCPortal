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
                      .ForMember(t => t.DocNo, s => s.MapFrom(o => o.DocNo))
                      .ForMember(t => t.FullWeightTime, s => s.MapFrom(o => o.FullWeightTime))
                      .ForMember(t => t.CustomerName, s => s.MapFrom(o => o.CustomerName))
                      .ForMember(t => t.CarNo, s => s.MapFrom(o => o.CarNo))
                      .ForMember(t => t.FullWeight, s => s.MapFrom(o => o.FullWeight))
                      .ForMember(t => t.DefectiveWeight, s => s.MapFrom(o => o.DefectiveWeight))
                      .ForMember(t => t.UnitPrice, s => s.MapFrom(o => o.UnitPrice))
                      .ForMember(t => t.HasTax, s => s.MapFrom(o => o.HasTax))
                      .ForMember(t => t.ScaleNo, s => s.MapFrom(o => o.ScaleNo))
                      .ForMember(t => t.TraficUnitPrice, s => s.MapFrom(o => o.TraficUnitPrice))
                      .ForMember(t => t.ThirdWeightFee, s => s.MapFrom(o => o.ThirdWeightFee))
                      .ForMember(t => t.WeightPrice, s => s.MapFrom(o => o.WeightPrice))
                      .ForMember(t => t.DeliveryFee, s => s.MapFrom(o => o.DeliveryFee))
                      .ForMember(t => t.ActualPrice, s => s.MapFrom(o => o.ActualPrice))
                      .ForMember(t => t.PayTime, s => s.MapFrom(o => o.PayTime))
                      .ForMember(t => t.Remark, s => s.MapFrom(o => o.Remark))).CreateMapper();
            #endregion

            return null;



        }
    }
}
