using AutoMapper;
using Microsoft.AspNetCore.Identity;
using PSI.Areas.SysConfig.Models;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;

namespace PSI.Infrastructure.Mappings
{
    public class CustomerMapping : Profile
    {
        public CustomerMapping()
        {
            //CreateMap<VM_Customer_Info, CustomerInfo>()
            //    .ForMember(x => x.Id, y => y.MapFrom(o => o.CardId))
            //    .ForMember(x => x.Name, y => y.MapFrom(o => $"{o.Id}: {o.Name}"))
            //    .ForMember(x => x.ImgUri, y => y.AllowNull())
            //    .ReverseMap();

            // ...其他的對映內容 (使用 CreateMap<> 建立下一組)
            CreateMap<VM_Create_CustomerInfo, CustomerInfo>().ReverseMap();
            CreateMap<AppUser, IdentityUser>().ReverseMap();
            //CreateMap<string, CustomerCar>()
            //         .ForMember(d => d.CarName, s => s.MapFrom(o => o))
            //         .ReverseMap();
        }
    }
}
