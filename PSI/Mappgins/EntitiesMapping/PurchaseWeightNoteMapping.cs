using AutoMapper;
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
                .ForMember(d => d.DocNo, s => s.MapFrom(ss => ss.DOC_NO))
                .ForMember(d => d.FullWeightTime, s => s.MapFrom(ss => ss.FULL_WEIGHT_TIME))
                .ForMember(d => d.CustomerName, s => s.MapFrom(ss => ss.CUSTOMER_NAME))
                .ForMember(d => d.CarNo, s => s.MapFrom(ss => ss.CAR_NO))
                .ForMember(d => d.FullWeight, s => s.MapFrom(ss => ss.FULL_WEIGHT))
                .ForMember(d => d.DefectiveWeight, s => s.MapFrom(ss => ss.DEFECTIVE_WEIGHT))
                .ForMember(d => d.UnitPrice, s => s.MapFrom(ss => ss.UNIT_PRICE))
                .ForMember(d => d.HasTax, s => s.MapFrom(ss => ss.HAS_TAX))
                .ForMember(d => d.ScaleNo, s => s.MapFrom(ss => ss.SCALE_NO))
                .ForMember(d => d.TraficUnitPrice, s => s.MapFrom(ss => ss.TRAFIC_UNIT_PRICE))
                .ForMember(d => d.ThirdWeightFee, s => s.MapFrom(ss => ss.THIRD_WEIGHT_FEE))
                .ForMember(d => d.WeightPrice, s => s.MapFrom(ss => ss.WEIGHT_PRICE))
                .ForMember(d => d.DeliveryFee, s => s.MapFrom(ss => ss.DELIVERY_FEE))
                .ForMember(d => d.ActualPrice, s => s.MapFrom(ss => ss.ACTUAL_PRICE))
                .ForMember(d => d.PayTime, s => s.MapFrom(ss => ss.PAY_TIME))
                .ForMember(d => d.Remark, s => s.MapFrom(ss => ss.REMARK));
            //.ConstructUsing(parentDto => new PageWeightNoteEditWeightNote());

        }
    }
}
