using AutoMapper;
using PSI.Areas.SysConfig.Models;
using PSI.Areas.SysConfig.Models.PageModels;
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

        public IMapper GetMapperOf_GetProductItemModel<T1, T2>()
        {
            switch (typeof(T1).Name, typeof(T2).Name)
            {
                case (nameof(ProductItem), nameof(SysConfigProduct_GetProductItemModel)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<ProductItem, SysConfigProduct_GetProductItemModel>()
                        .ForMember(tar => tar.ProductUNID, s => s.MapFrom(ss => ss.PRODUCT_UNID))
                        .ForMember(tar => tar.ProductName, s => s.MapFrom(ss => ss.PRODUCT_NAME))
                        .ForMember(tar => tar.PsiType, s => s.MapFrom(ss => ss.PSI_TYPE))
                        .ForMember(tar => tar.IsEffective, s => s.MapFrom(ss => ss.IS_EFFECTIVE))
                        .ForMember(tar => tar.Remark, s => s.MapFrom(ss => ss.REMARK))
                       ).CreateMapper();
                default:
                    return null;
            }
        }

        public IMapper GetMapperOfCreateProductItem<T1, T2>()
        {
            switch (typeof(T1).Name, typeof(T2).Name)
            {
                case (nameof(SysConfigProductCreateProductItem), nameof(ProductItem)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<SysConfigProductCreateProductItem, ProductItem>()
                        .ForMember(tar => tar.PRODUCT_UNID, s => s.MapFrom(ss => ss.ProductUNID))
                        .ForMember(tar => tar.PRODUCT_NAME, s => s.MapFrom(ss => ss.ProductItemName))
                        .ForMember(tar => tar.PSI_TYPE, s => s.MapFrom(ss => ss.PsiType))
                        .ForMember(tar => tar.IS_EFFECTIVE, s => s.MapFrom(ss => ss.IsEffective))
                        .ForMember(tar => tar.REMARK, s => s.MapFrom(ss => ss.Remark))
                       ).CreateMapper();
                default:
                    return null;
            }
        }


    }
}
