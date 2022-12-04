using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Enums;
using PSI.Core.Models.PageModels.Areas.Sales;
using PSI.Mappgins.Interface;
using PSI.Service.IService;

namespace PSI.Mappgins
{
    public class MapperOfSalesWeightNote : IMapperOfSalesWeightNote
    {
        private readonly IPsiService _iPsiService;

        public MapperOfSalesWeightNote(IPsiService iPsiService)
        {
            _iPsiService = iPsiService;
        }

        public IMapper SalesWeightNoteCreate<T>()
        {
            switch (typeof(T).Name)
            {
                case (nameof(WeightNoteCreateWeightNote)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<WeightNoteCreateWeightNote, SalesWeightNote>()
                      .ForMember(tar => tar.CUSTOMER_UNID, ss => ss.MapFrom(src => src.CustomerUNID))
                      .ForMember(tar => tar.CARNO_UNID, ss => ss.MapFrom(src => src.CarNoUNID))
                      .ForMember(tar => tar.EXCAVATOR_OPERATOR_UNID, ss => ss.MapFrom(src => src.ExcavatorOperUNID))
                      .ForMember(tar => tar.SALES_TIME, ss => ss.MapFrom(src => src.SalesTime))
                      .ForMember(tar => tar.CONTRACT_UNID, ss => ss.MapFrom(src => src.ContractUNID))
                      //.ForMember(tar => tar.PRODUCT_ITEM_UNID, ss => ss.MapFrom(src => src.ProductItemUNID))
                      //.ForMember(tar => tar.ESTIMATE_SALES_WEIGHT, ss => ss.MapFrom(src => src.LeaveWeight))
                      //.ForMember(tar => tar.ESTIMATE_DEFECTIVE_WEIGHT, ss => ss.MapFrom(src => src.DefectiveWeight))
                      //.ForMember(tar => tar.ESTIMATE_UNIT_PRICE, ss => ss.MapFrom(src => src.UnitPrice))
                      //.ForMember(tar => tar.TRAFIC_UNIT_PRICE, ss => ss.MapFrom(src => src.TraficUnitPrice))
                      .ForMember(tar => tar.NOTE_STATUS, ss => ss.MapFrom(src => (int)PSIWeightNoteEnum.SWeightNotesStatus.CreateDoc))
                      .ForMember(tar => tar.SCALE_NO, ss => ss.MapFrom(src => src.ScaleNo))
                      //.ForMember(tar => tar.ESTIMATE_RECEIVED_TYPE, ss => ss.MapFrom(src => src.ReceivedType))
                      //.ForMember(tar => tar.ESTIMATE_RECEIVED_TIME, ss => ss.MapFrom(src => src.ReceivedTime))
                      .ForMember(tar => tar.REMARK, ss => ss.MapFrom(src => src.Remark))
                      ).CreateMapper();
                //case (nameof(PurchaseIngredient), nameof(VE_PurchaseIngredient)):
                //    return new MapperConfiguration(cfg =>
                //    cfg.CreateMap<PurchaseIngredient, VE_PurchaseIngredient>()
                //      .ForMember(t => t.PurchaseWeightNoteUNID, s => s.MapFrom(o => o.PURCHASE_WEIGHTNOTE_UNID))
                //      .ForMember(t => t.ProductUNID, s => s.MapFrom(o => o.PRODUCT_UNID))
                //      .ForMember(t => t.ItemName, s => s.MapFrom(o => o.ITEM_NAME))
                //      .ForMember(t => t.ItemPercent, s => s.MapFrom(o => o.ITEM_PERCENT))).CreateMapper();
                default:
                    return null;
            }




        }
    }
}
