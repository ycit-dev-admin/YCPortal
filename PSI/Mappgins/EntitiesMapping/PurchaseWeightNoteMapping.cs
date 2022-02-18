using AutoMapper;
using PSI.Areas.Purchase.Models.IVE_Models;
using PSI.Areas.Purchase.Models.PageModels;
using PSI.Core.Entities;

namespace PSI.Mappings.EntitiesMappging
{
    public class PurchaseWeightNoteMapping : Profile
    {
        public PurchaseWeightNoteMapping()
        {
            //CreateMap<PurchaseWeightNote, Page_WeightNote_EditWeightNote>();

            /* Interface example  https://stackoverflow.com/questions/47695045/automapper-interface-mapping?rq=1  */
            // CreateMap<PurchaseWeightNote, IVE_PurchaseWeightNote_Edit>()
            //.ConstructUsing(parentDto => new Page_WeightNote_EditWeightNote())
            //.ForMember(a => a.DocNo, b => b.MapFrom(c => c.DocNo))
            //.ConvertUsing(......

            CreateMap<PurchaseWeightNote, PageWeightNoteEditWeightNote>()
                .ForMember(d => d.DocNo, s => s.MapFrom(ss => ss.DocNo))
                .ForMember(d => d.FullWeightTime, s => s.MapFrom(ss => ss.FullWeightTime))
                .ForMember(d => d.CustomerName, s => s.MapFrom(ss => ss.CustomerName))
                .ForMember(d => d.CarNo, s => s.MapFrom(ss => ss.CarNo))
                .ForMember(d => d.FullWeight, s => s.MapFrom(ss => ss.FullWeight))
                .ForMember(d => d.DefectiveWeight, s => s.MapFrom(ss => ss.DefectiveWeight))
                .ForMember(d => d.UnitPrice, s => s.MapFrom(ss => ss.UnitPrice))
                .ForMember(d => d.HasTax, s => s.MapFrom(ss => ss.HasTax))
                .ForMember(d => d.ScaleNo, s => s.MapFrom(ss => ss.ScaleNo))
                .ForMember(d => d.TraficUnitPrice, s => s.MapFrom(ss => ss.TraficUnitPrice))
                .ForMember(d => d.ThirdWeightFee, s => s.MapFrom(ss => ss.ThirdWeightFee))
                .ForMember(d => d.WeightPrice, s => s.MapFrom(ss => ss.WeightPrice))
                .ForMember(d => d.DeliveryFee, s => s.MapFrom(ss => ss.DeliveryFee))
                .ForMember(d => d.ActualPrice, s => s.MapFrom(ss => ss.ActualPrice))
                .ForMember(d => d.PayTime, s => s.MapFrom(ss => ss.PayTime))
                .ForMember(d => d.Remark, s => s.MapFrom(ss => ss.Remark));
            //.ConstructUsing(parentDto => new PageWeightNoteEditWeightNote());

        }
    }
}
