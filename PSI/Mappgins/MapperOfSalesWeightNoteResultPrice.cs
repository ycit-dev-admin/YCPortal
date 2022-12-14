using System;
using System.Linq;
using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Enums;
using PSI.Core.Interfaces.Repository;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Core.Models.PageModels.Areas.Sales;
using PSI.Mappgins.Interface;
using PSI.Models.VEModels;
using PSI.Service.Helper.IHelper;
using PSI.Service.IService;

namespace PSI.Mappgins
{
    public class MapperOfSalesWeightNoteResultPrice : IMapperOfSalesWeightNoteResultPrice
    {
        private readonly IPsiService _iPsiService;
        private readonly ISalesPriceCaculateHelper _iSalesPriceCaculateHelper;

        public MapperOfSalesWeightNoteResultPrice(IPsiService iPsiService,
            ISalesPriceCaculateHelper iSalesPriceCaculateHelper)
        {
            _iSalesPriceCaculateHelper = iSalesPriceCaculateHelper;
            _iPsiService = iPsiService;
        }

        public IMapper SalesWeightNoteCreate<T>()
        {
            switch (typeof(T).Name)
            {
                case (nameof(WeightNoteCreateWeightNote)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<WeightNoteCreateWeightNote, SalesWeightNoteStepData>()
                    .ForMember(tar => tar.DATA_STEP, ss => ss.MapFrom(src => (int)S_Enum.WeightNotesStatus.CreateDoc))
                    .ForMember(tar => tar.INVOICEPRICE_HASTAX, ss => ss.MapFrom(src => src.InvoicePriceHasTax))
                    .ForMember(tar => tar.TRAFICFEE_HASTAX, ss => ss.MapFrom(src => src.TraficFeeHasTax))
                    .ForMember(tar => tar.INVOICE_PRICE, ss => ss.MapFrom(src =>
                    _iSalesPriceCaculateHelper.GetInvoicePrice((double)src.SalesWeight,
                    src.DefectiveWeight.Value,
                    src.UnitPrice.Value,
                    src.InvoicePriceHasTax)))
                    .ForMember(tar => tar.TRAFIC_FEE, ss => ss.MapFrom(src =>
                    _iSalesPriceCaculateHelper.GetDeliveryPrice((double)src.SalesWeight,
                    src.TraficUnitPrice,
                    src.TraficFeeHasTax)))
                    .AfterMap((src, tar) =>
                    {
                        tar.RECEIVED_PRICE = tar.INVOICE_PRICE - tar.TRAFIC_FEE;
                    })
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
