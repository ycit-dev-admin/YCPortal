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
    public class PageModelMapper : IPageModelMapper
    {

        private readonly ICustomerInfoService _iCustomerInfoService;
        private readonly ICarNoService _iCarNoService;
        private readonly ISalesIngredientService _iSalesIngredientService;


        public PageModelMapper(ICustomerInfoService iCustomerInfoService,
                               ICarNoService iCarNoService,
                               ISalesIngredientService iSalesIngredientService)
        {
            _iCustomerInfoService = iCustomerInfoService;
            _iCarNoService = iCarNoService;
            _iSalesIngredientService = iSalesIngredientService;
        }



        public T2 MapTo<T1, T2>(S_WeightNote salesWeightNote)
            where T1 : S_WeightNote
            where T2 : WeightNoteUpdateActualData
        {
            return new MapperConfiguration(cfg =>
             cfg.CreateMap<T1, T2>()
                   //.ForMember(tar => tar.CustomerName,
                   //           arg => arg.MapFrom(
                   //           src => _iCustomerInfoService.GetCustomerInfo(src.CUSTOMER_UNID).CUSTOMER_NAME))
            //.ForMember(tar => tar.CustomerInfoItems,
            //           arg => arg.MapFrom(src => _iCustomerInfoService.GetSalesCustomerInfo().ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME),
            //           nameof(CustomerInfo.CUSTOMER_GUID), src.CUSTOMER_UNID.ToString())))

            ).CreateMapper().Map<T2>(salesWeightNote);
        }
        //public T GetModel<T>(SalesWeightNote salesWeightNote)
        //    where T : WeightNoteUpdateActualData
        //{
        //    return new MapperConfiguration(cfg =>
        //     cfg.CreateMap<SalesWeightNote, T>()
        //        //.ForMember(tar => tar.CustomerName,
        //        //                  arg => arg.MapFrom(
        //        //                         src => _iCustomerInfoService.GetCustomerInfo(src.CUSTOMER_UNID).CUSTOMER_NAME))
        //        .ForMember(tar => tar.CarNo,
        //                          arg => arg.MapFrom(
        //                                 src => _iCarNoService.GetCustomerCarBy(src.CARNO_UNID).CAR_NAME))
        //        .ForMember(tar => tar.LeaveWeightTime, arg => arg.MapFrom(src => src.LEAVE_WEIGHT_TIME))
        //        .ForMember(tar => tar.DTOSalesIngredients,
        //        arg => arg.MapFrom(src => _iSalesIngredientService.GetSalesIngredients(src.UNID)))
        //        .ForMember(tar => tar.LeaveWeight,
        //        arg => arg.MapFrom(src => src.ESTIMATE_SALES_WEIGHT))
        //    //.ForMember(tar => tar.CustomerInfoItems,
        //    //           arg => arg.MapFrom(src => _iCustomerInfoService.GetSalesCustomerInfo().ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME),
        //    //           nameof(CustomerInfo.CUSTOMER_GUID), src.CUSTOMER_UNID.ToString())))

        //    ).CreateMapper().Map<T>(salesWeightNote);
        //}

        public IMapper GetMapper<T1, T2>(S_WeightNote salesWeightNote = null)
          where T1 : S_WeightNote
          where T2 : WeightNoteUpdateActualData
        {
            return new MapperConfiguration(cfg =>
             cfg.CreateMap<T1, T2>()
                   //.ForMember(tar => tar.CustomerName,
                   //           arg => arg.MapFrom(
                   //           src => _iCustomerInfoService.GetCustomerInfo(src.CUSTOMER_UNID).CUSTOMER_NAME))
            //.ForMember(tar => tar.CustomerInfoItems,
            //           arg => arg.MapFrom(src => _iCustomerInfoService.GetSalesCustomerInfo().ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME),
            //           nameof(CustomerInfo.CUSTOMER_GUID), src.CUSTOMER_UNID.ToString())))

            ).CreateMapper();
        }

        public IMapper GetMapper<T1>(S_WeightNote salesWeightNote = null, WeightNoteUpdateActualData weightNoteUpdateActualData = null)
          where T1 : S_WeightNote
        {
            return new MapperConfiguration(cfg =>
             cfg.CreateMap<T1, WeightNoteUpdateActualData>()
                   //.ForMember(tar => tar.CustomerName,
                   //           arg => arg.MapFrom(
                   //           src => _iCustomerInfoService.GetCustomerInfo(src.CUSTOMER_UNID).CUSTOMER_NAME))
            //.ForMember(tar => tar.CustomerInfoItems,
            //           arg => arg.MapFrom(src => _iCustomerInfoService.GetSalesCustomerInfo().ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME),
            //           nameof(CustomerInfo.CUSTOMER_GUID), src.CUSTOMER_UNID.ToString())))

            ).CreateMapper();
        }


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
