using System.Collections.Generic;
using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Models.PageModels.Areas.Sales;
using PSI.Infrastructure.Extensions;
using PSI.Mappgins.Interface;
using PSI.Models.PEModels;
using PSI.Service.IService;

namespace PSI.Mappgins
{
    public class MapperOfPE_SalesWeightNote : IPESalesWeightNoteMapper
    {

        private readonly ICustomerInfoService _iCustomerInfoService;
        private readonly IProductItemService _iProductItemService;
        private readonly ISalesWeightNoteResultPriceService _iSalesWeightNoteResultPriceService;

        public MapperOfPE_SalesWeightNote(ICustomerInfoService iCustomerInfoService,
            IProductItemService iProductItemService,
            ISalesWeightNoteResultPriceService iSalesWeightNoteResultPriceService)
        {
            _iCustomerInfoService = iCustomerInfoService;
            _iProductItemService = iProductItemService;
            _iSalesWeightNoteResultPriceService = iSalesWeightNoteResultPriceService;
        }

        public IMapper SalesWeightNoteQueryList<T>() where T : SalesWeightNote
        {
            return new MapperConfiguration(cfg =>
            cfg.CreateMap<T, PE_SalesWeightNote>()
                .ForMember(tar => tar.CustomerName,
                           arg => arg.MapFrom(src => _iCustomerInfoService.GetCustomerInfo(src.CUSTOMER_UNID).CUSTOMER_NAME))
                //.ForMember(tar => tar.MainProductItemName,
                //           arg => arg.MapFrom(src => _iProductItemService.GetProductItem(src.ESTIMATE_PRODUCT_ITEM_UNID).PRODUCT_NAME))
                .ForMember(tar => tar.EstimateInvoicePrice,
                           arg => arg.MapFrom(src => _iSalesWeightNoteResultPriceService
                                                    .GetEstimateSalesWeightNoteResultPrice(src.UNID).INVOICE_PRICE))

            ).CreateMapper();
        }

        public IMapper SalesWeightNoteActualDataUpdate<T>() where T : SalesWeightNote
        {
            return new MapperConfiguration(cfg =>
            cfg.CreateMap<SalesWeightNote, PE_SalesWeightNote>()
                .ForMember(tar => tar.CustomerName,
                           arg => arg.MapFrom(src => _iCustomerInfoService.GetCustomerInfo(src.CUSTOMER_UNID).CUSTOMER_NAME))
                //.ForMember(tar => tar.MainProductItemName,
                //           arg => arg.MapFrom(src => _iProductItemService.GetProductItem(src.ESTIMATE_PRODUCT_ITEM_UNID).PRODUCT_NAME))
                .ForMember(tar => tar.EstimateInvoicePrice,
                           arg => arg.MapFrom(src => _iSalesWeightNoteResultPriceService
                                                    .GetEstimateSalesWeightNoteResultPrice(src.UNID).INVOICE_PRICE))

            ).CreateMapper();
        }

        public IMapper GetUpdateActualDataMapper<T>() where T : SalesWeightNote
        {
            return new MapperConfiguration(cfg =>
            cfg.CreateMap<T, PE_SalesWeightNote>()
                .ForMember(tar => tar.CustomerName,
                           arg => arg.MapFrom(src => _iCustomerInfoService.GetCustomerInfo(src.CUSTOMER_UNID).CUSTOMER_NAME))
                //.ForMember(tar => tar.MainProductItemName,
                //           arg => arg.MapFrom(src => _iProductItemService.GetProductItem(src.ESTIMATE_PRODUCT_ITEM_UNID).PRODUCT_NAME))
                .ForMember(tar => tar.EstimateInvoicePrice,
                           arg => arg.MapFrom(src => _iSalesWeightNoteResultPriceService
                                                    .GetEstimateSalesWeightNoteResultPrice(src.UNID).INVOICE_PRICE))

            ).CreateMapper();

        }

        //public T MapTo<T>(SalesWeightNote salesWeightNote) where T : WeightNoteUpdateActualData
        //{
        //    return new MapperConfiguration(cfg =>
        //      cfg.CreateMap<SalesWeightNote, T>()
        //          .ForMember(tar => tar.CustomerInfoItems,
        //          arg => arg.MapFrom(src => _iCustomerInfoService.GetSalesCustomerInfo().ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME),
        //          nameof(CustomerInfo.CUSTOMER_GUID), src.CUSTOMER_UNID.ToString())))


        //     //.ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME),
        //     //nameof(CustomerInfo.CUSTOMER_GUID),
        //     //pageModel.CustomerUNID.ToString());

        //     ).CreateMapper().Map<T>(salesWeightNote);

        //}

        //public T MapTo<T>(T salesWeightNote) where T : WeightNoteUpdateActualData
        //{
        //    return new MapperConfiguration(cfg =>
        //      cfg.CreateMap<T, T>()
        //          .ForMember(tar => tar.CustomerInfoItems,
        //          arg => arg.MapFrom(src => _iCustomerInfoService.GetSalesCustomerInfo().ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME),
        //          nameof(CustomerInfo.CUSTOMER_GUID), src.CarNoUNID.ToString())))


        //     //.ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME),
        //     //nameof(CustomerInfo.CUSTOMER_GUID),
        //     //pageModel.CustomerUNID.ToString());

        //     ).CreateMapper().Map<T>(salesWeightNote);

        //}

        //public IMapper GetMapper<T1, T2>()
        //    where T1 : SalesWeightNote
        //    where T2 : WeightNoteUpdateActualData
        //{
        //    return new MapperConfiguration(cfg =>
        //      cfg.CreateMap<T1, T2>()
        //          .ForMember(tar => tar.CustomerInfoItems,
        //          arg => arg.MapFrom(src => _iCustomerInfoService.GetSalesCustomerInfo().ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME),
        //          nameof(CustomerInfo.CUSTOMER_GUID), src.CUSTOMER_UNID.ToString())))
        //          ).CreateMapper();
        //}

        //public T2 MapTo<T1, T2>(T1 salesWeightNote)
        //    where T1 : SalesWeightNote
        //    where T2 : WeightNoteUpdateActualData
        //{
        //    return new MapperConfiguration(cfg =>
        //     cfg.CreateMap<T1, T2>()
        //         .ForMember(tar => tar.CustomerInfoItems,
        //         arg => arg.MapFrom(src => _iCustomerInfoService.GetSalesCustomerInfo().ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME),
        //         nameof(CustomerInfo.CUSTOMER_GUID), src.CUSTOMER_UNID.ToString())))
        //    ).CreateMapper().Map<T2>(salesWeightNote);
        //}

        //public List<T> MapTo<T>(List<SalesWeightNote> salesWeightNote) where T : WeightNoteUpdateActualData
        //{
        //    return new MapperConfiguration(cfg =>
        //      cfg.CreateMap<SalesWeightNote, T>()
        //          .ForMember(tar => tar.CustomerInfoItems,
        //          arg => arg.MapFrom(src => _iCustomerInfoService.GetSalesCustomerInfo().ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME),
        //          nameof(CustomerInfo.CUSTOMER_GUID), src.CUSTOMER_UNID.ToString())))


        //     //.ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME),
        //     //nameof(CustomerInfo.CUSTOMER_GUID),
        //     //pageModel.CustomerUNID.ToString());

        //     ).CreateMapper().Map<List<T>>(salesWeightNote);
        //}
    }
}
