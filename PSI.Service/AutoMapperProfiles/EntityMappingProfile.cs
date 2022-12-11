using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Models.DTOModels;
using PSI.Core.Models.PageModels.Areas.Sales;
using PSI.Service.AutoMapperMappActions;

namespace PSI.Service.Mappings
{
    public class EntityMappingProfile : Profile
    {
        public EntityMappingProfile()
        {
            // Entity -> DTOModel
            this.CreateMap<S_WeightNote, DTO_SalesWeightNote>()
                .AfterMap<SalesWeightNoteToDTOAction>();
            this.CreateMap<SalesWeightNoteStepData, DTO_SalesWeightNoteStepData>()
                .AfterMap<SalesWeightNoteStepDataToDTOAction>();


            this.CreateMap<CodeTable, DTO_CodeTable>();
            this.CreateMap<CustomerInfo, DTO_CustomerInfo>();
            this.CreateMap<CustomerCar, DTO_CustomerCar>();
            this.CreateMap<S_WeightNote_Ingredient, DTO_S_WeightNote_Ingredient>();
            this.CreateMap<ProductItem, DTO_ProductItem>();
            this.CreateMap<CustomerContract, DTO_CustomerContract>();
            this.CreateMap<P_Inventory, DTO_P_Inventory>();


            //this.CreateMap<CardSearchInfo, CardSearchCondition>();

            // Entity -> PageModel
            //this.CreateMap<SalesWeightNote, WeightNoteUpdateActualData>()
            //    .ForMember(tar => tar.LeaveWeightTime, arg => arg.MapFrom(src => src.LEAVE_WEIGHT_TIME))
            //    .ForMember(tar => tar.LeaveWeight, arg => arg.MapFrom(src => src.ESTIMATE_SALES_WEIGHT))
            //    .AfterMap<EntityToDTOAction2>();
        }
    }


}
