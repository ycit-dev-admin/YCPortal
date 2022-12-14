using System;
using AutoMapper;
using PSI.Areas.Purchase.Models.PageModels;
using PSI.Core.Entities;
using PSI.Core.Enums;
using PSI.Models.VEModels;
using WeightNoteCreateWeightNote = PSI.Core.Models.PageModels.Areas.Sales.WeightNoteCreateWeightNote;

namespace PSI.Areas.Sales.Mappers
{
    public class WeightNoteControllerMapper
    {
        // private readonly IPsiService _psiService;
        public WeightNoteControllerMapper()
        {
            // _psiService = psiService;
        }

        public IMapper GetMapperOfCreateWeightNote<T1, T2>()
        {
            switch (typeof(T1).Name, typeof(T2).Name)
            {
                case (nameof(WeightNoteCreateWeightNote), nameof(PurchaseWeightNote)):


                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<WeightNoteCreateWeightNote, PurchaseWeightNote>()
                      .ForMember(t => t.FULL_WEIGHT_TIME, s => s.MapFrom(o => o.SalesTime))
                      .ForMember(t => t.CUSTOMER_UNID, s => s.MapFrom(o => o.CustomerUNID))
                      .ForMember(t => t.CONTRACT_UNID, s => s.MapFrom(o => o.ContractUNID ?? null))
                      //.ForMember(t => t.CAR_NO, s => s.MapFrom(o => o.CarNo))
                      .ForMember(t => t.DEFECTIVE_WEIGHT, s => s.MapFrom(o => o.DefectiveWeight))
                      .ForMember(t => t.UNIT_PRICE, s => s.MapFrom(o => o.UnitPrice))
                      .ForMember(t => t.SCALE_NO, s => s.MapFrom(o => o.ScaleNo))
                      .ForMember(t => t.TRAFIC_UNIT_PRICE, s => s.MapFrom(o => o.TraficUnitPrice))
                      //.ForMember(t => t.THIRD_WEIGHT_FEE, s => s.MapFrom(o => o.ThirdWeightFee))
                      .ForMember(t => t.PAY_TYPE, s => s.MapFrom(o => o.ReceivedType))
                      .ForMember(t => t.PAY_TIME, s => s.MapFrom(o => o.ReceivedTime))
                      .ForMember(t => t.REMARK, s => s.MapFrom(o => o.Remark))
                      .ForMember(t => t.INPUT_TYPE, s => s.MapFrom(o => "1"))
                      .ForMember(t => t.NOTE_STATUS, s => s.MapFrom(o => o.ReceivedType == 1 ?
                                                                    P_Enum.WeightNotesStatus.Completed :  // 只有付現是結清
                                                                    P_Enum.WeightNotesStatus.Ongo))
                      ).CreateMapper();
                case (nameof(CustomerCar), nameof(VE_CustomerCar)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<CustomerCar, VE_CustomerCar>()
                      // .ForMember(t => t.InsideCarName, s => s.MapFrom(o => o.PurchaseWeightNoteUNID))                      
                      ).CreateMapper();
                case (nameof(WeightNoteCreateWeightNote), nameof(CustomerContractLog)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<WeightNoteCreateWeightNote, CustomerContractLog>()
                      .ForMember(t => t.CONTRACT_UNID, s => s.MapFrom(o => o.ContractUNID))
                      .ForMember(t => t.IS_EFFECTIVE, s => s.MapFrom(o => "1"))
                      ).CreateMapper();
                case (nameof(WeightNoteCreateWeightNote), nameof(CustomerInfo)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<WeightNoteCreateWeightNote, CustomerInfo>()
                      .ForMember(t => t.PSI_TYPE, s => s.MapFrom(o => PSIEnum.PSIType.Purchase))
                      .ForMember(t => t.IS_EFFECTIVE, s => s.MapFrom(o => "1"))
                      ).CreateMapper();
                case (nameof(WeightNoteCreateWeightNote), nameof(CustomerCar)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<WeightNoteCreateWeightNote, CustomerCar>()
                      // .ForMember(t => t.CAR_NAME, s => s.MapFrom(o => o.CarNo))
                      .ForMember(t => t.IS_EFFECTIVE, s => s.MapFrom(o => "1"))
                      ).CreateMapper();
                default:
                    return null;
            }
        }

        public IMapper GetMapperOfWeightNoteList<T1, T2>()
        {
            switch (typeof(T1).Name, typeof(T2).Name)
            {
                case (nameof(PurchaseWeightNote), nameof(VE_PurchaseWeightNote)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<PurchaseWeightNote, VE_PurchaseWeightNote>()
                      .ForMember(t => t.FullWeightTime, s => s.MapFrom(o => o.FULL_WEIGHT_TIME))
                      .ForMember(t => t.DocNo, s => s.MapFrom(o => o.DOC_NO))
                      .ForMember(t => t.CustomerName, s => s.MapFrom(o => o.CUSTOMER_NAME))
                      .ForMember(t => t.Unid, s => s.MapFrom(o => o.UNID))
                      .ForMember(t => t.FullWeight, s => s.MapFrom(o => o.FULL_WEIGHT))
                      .ForMember(t => t.DefectiveWeight, s => s.MapFrom(o => o.DEFECTIVE_WEIGHT))
                      .ForMember(t => t.UnitPrice, s => s.MapFrom(o => o.UNIT_PRICE))
                      .ForMember(t => t.ActualPrice, s => s.MapFrom(o => o.ACTUAL_PRICE))
                      .ForMember(t => t.PayType, s => s.MapFrom(o => o.PAY_TYPE))
                      .ForMember(t => t.PayTime, s => s.MapFrom(o => o.PAY_TIME))).CreateMapper();
                case (nameof(PurchaseIngredient), nameof(VE_PurchaseIngredient)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<PurchaseIngredient, VE_PurchaseIngredient>()
                      .ForMember(t => t.PurchaseWeightNoteUNID, s => s.MapFrom(o => o.PURCHASE_WEIGHTNOTE_UNID))
                      .ForMember(t => t.ProductUNID, s => s.MapFrom(o => o.PRODUCT_UNID))
                      .ForMember(t => t.ItemName, s => s.MapFrom(o => o.ITEM_NAME))
                      .ForMember(t => t.ItemPercent, s => s.MapFrom(o => o.ITEM_PERCENT))).CreateMapper();
                default:
                    return null;
            }
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
