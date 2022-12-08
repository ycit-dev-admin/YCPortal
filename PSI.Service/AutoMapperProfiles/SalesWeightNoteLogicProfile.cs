using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Enums;
using PSI.Core.Models.DTOModels;
using PSI.Core.Models.PageModels.Areas.Sales;
using PSI.Service.AutoMapperMappActions;
using PSI.Service.Helper;

namespace PSI.Service.AutoMapperProfiles
{
    public class SalesWeightNoteLogicProfile : Profile
    {

        public SalesWeightNoteLogicProfile()
        {
            // DTOModel -> Entity
            CreateMap<WeightNoteCreateWeightNote, S_WeightNote>()
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
                .ForMember(tar => tar.SCALE_NO, ss => ss.MapFrom(src => src.ScaleNo))
                //.ForMember(tar => tar.ESTIMATE_RECEIVED_TYPE, ss => ss.MapFrom(src => src.ReceivedType))
                //.ForMember(tar => tar.ESTIMATE_RECEIVED_TIME, ss => ss.MapFrom(src => src.ReceivedTime))
                .ForMember(tar => tar.REMARK, ss => ss.MapFrom(src => src.Remark));

            CreateMap<DTO_SalesIngredient, SalesIngredient>();

            CreateMap<WeightNoteCreateWeightNote, SalesWeightNoteStepData>()
                .ForMember(tar => tar.DATA_STEP, ss => ss.MapFrom(src => (int)PSIWeightNoteEnum.SWeightNotesStatus.CreateDoc))
                .ForMember(tar => tar.INVOICEPRICE_HASTAX, ss => ss.MapFrom(src => src.InvoicePriceHasTax))
                .ForMember(tar => tar.TRAFICFEE_HASTAX, ss => ss.MapFrom(src => src.TraficFeeHasTax))
            //.AfterMap<SalesWeightNoteLogicMapAction>();
            .AfterMap((src, tar) =>
            {
                var salesPriceCaculateHelper = new SalesPriceCaculateHelper();

                tar.INVOICE_PRICE = salesPriceCaculateHelper.GetInvoicePrice((double)src.SalesWeight,
                   src.DefectiveWeight.Value,
                   src.UnitPrice.Value,
                   src.InvoicePriceHasTax);
                tar.TRAFIC_FEE = salesPriceCaculateHelper.GetDeliveryPrice((double)src.SalesWeight,
                        src.TraficUnitPrice,
                        src.TraficFeeHasTax);
                tar.RECEIVED_PRICE = tar.INVOICE_PRICE - tar.TRAFIC_FEE;
            });



        }
    }


}
