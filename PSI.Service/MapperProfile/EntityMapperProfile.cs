using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Models.DTOModels;
using PSI.Service.AutoMapperMappActions;
using PSI.Service.IMapperProfile;
using PSI.Service.IService;

namespace PSI.Service.MapperProfile
{
    public class EntityMapperProfile : IEntityMapperProfile
    {
        private readonly ICustomerInfoService _iCustomerInfoService;
        private readonly IProductItemService _iProductItemService;
        private readonly ISalesWeightNoteResultPriceService _iSalesWeightNoteResultPriceService;
        //private readonly ICodeTableServiceNew _iCodeTableServiceNew;

        public EntityMapperProfile(ICustomerInfoService iCustomerInfoService,
            IProductItemService iProductItemService,
            ISalesWeightNoteResultPriceService iSalesWeightNoteResultPriceService
            //, ICodeTableServiceNew iCodeTableServiceNew
            )
        {
            _iCustomerInfoService = iCustomerInfoService;
            _iProductItemService = iProductItemService;
            _iSalesWeightNoteResultPriceService = iSalesWeightNoteResultPriceService;
            //_iCodeTableServiceNew = iCodeTableServiceNew;
        }
        public IMapper GetIMapper<TEntity, DTOModel>()
        {
            switch (typeof(TEntity).Name, typeof(DTOModel).Name)
            {
                case (nameof(S_WeightNote), nameof(DTO_S_WeightNote)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<S_WeightNote, DTO_S_WeightNote>()
                        //.ForMember(tar => tar.PayTypeName,
                        //           arg => arg.MapFrom(src => _iCodeTableServiceNew.GetReceivedTypeItems()
                        //                  .FirstOrDefault(aa => aa.CODE_VALUE == src.ESTIMATE_RECEIVED_TYPE.ToString()).CODE_TEXT))
                        //.ForMember(tar => tar.EstimateMainItemName,
                        //    arg => arg.MapFrom(src => _iProductItemService.GetProductItem(src.ESTIMATE_PRODUCT_ITEM_UNID).PRODUCT_NAME))
                        //.ForMember(tar => tar.EstimateInvoicePrice,
                        //    arg => arg.MapFrom(src => _iSalesWeightNoteResultPriceService
                        //                             .GetEstimateSalesWeightNoteResultPrice(src.UNID).INVOICE_PRICE))
                        //.ForMember(tar => tar.CustomerName,
                        //           arg => arg.MapFrom(src => _iCustomerInfoService.GetCustomerInfo(src.CUSTOMER_UNID).CUSTOMER_NAME))
                       //.AfterMap<SalesWeightNoteLogicMapAction>()
                       //.AfterMap((src, tar) =>
                       //{
                       //    var abc = _iCodeTableServiceNew.GetPayTypeItems();
                       //    tar.PayTypeName = _iCodeTableServiceNew.GetPayTypeItems().FirstOrDefault(aa => aa.CODE_VALUE == src.ESTIMATE_RECEIVED_TYPE.ToString())?.CODE_TEXT;
                       //})

                       ).CreateMapper();

                case (nameof(CodeTable), nameof(DTO_CodeTable)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<CodeTable, DTO_CodeTable>()
                        ).CreateMapper();

                default:
                    return null;
            }


            //Dictionary Demo
            //var t2 = new Dictionary<(string, string), IMapper>
            //{
            //    {
            //        (nameof(SalesWeightNote), nameof(DTO_SalesWeightNote)),
            //        new MapperConfiguration(cfg =>
            //                                cfg.CreateMap<SalesWeightNote, DTO_SalesWeightNote>()
            //                                .ForMember(tar => tar.Unid, arg => arg.MapFrom(src => src.UNID))
            //                                .ForMember(tar => tar.CustomerName,
            //                                                  arg => arg.MapFrom(src => _iCustomerInfoService.GetCustomerInfo(src.CUSTOMER_UNID).CUSTOMER_NAME))
            //                                ).CreateMapper()
            //    }
            //};
            //return t2[(typeof(TEntity).Name, typeof(DTOModel).Name)];
        }
    }
}
