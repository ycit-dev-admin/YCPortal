using AutoMapper;
using PSI.Core.Entities;
using PSI.Models.VEModels;

namespace PSI.Areas.SysConfig.Mappers
{
    public class ProductControllerMapper
    {
        public ProductControllerMapper()
        {
        }


        public IMapper GetMapperOfOnlineInfo<T1, T2>()
        {
            switch (typeof(T1).Name, typeof(T2).Name)
            {
                case (nameof(ProductItem), nameof(VE_ProductItem)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<ProductItem, VE_ProductItem>()
                        .ForMember(tar => tar.ProductGUID, s => s.MapFrom(ss => ss.PRODUCT_UNID))
                        .ForMember(tar => tar.ProductName, s => s.MapFrom(ss => ss.PRODUCT_NAME))
                        .ForMember(tar => tar.PsiType, s => s.MapFrom(ss => ss.PSI_TYPE))
                        .ForMember(tar => tar.IsEffective, s => s.MapFrom(ss => ss.IS_EFFECTIVE))
                        .ForMember(tar => tar.Remark, s => s.MapFrom(ss => ss.REMARK))
                        .ForMember(tar => tar.UpdateEmpInfo, s => s.MapFrom(ss => ss.UPDATE_EMPNO))
                        .ForMember(tar => tar.UpdateTime, s => s.MapFrom(ss => ss.UPDATE_TIME))
                       ).CreateMapper();
                default:
                    return null;
            }

        }



    }
}
