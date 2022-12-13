using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Models.DTOModels;
using PSI.Core.Models.PageModels.Areas.Sales;
using PSI.Service.IService;
using System;

namespace PSI.Service.AutoMapperProfiles.Entity
{
    public class WeightNoteCreateWeightNote_MapProfile_Action1 : IMappingAction<WeightNoteCreateWeightNote, S_WeightNote>
    {
        private readonly IPsiService _iPSIService;


        public WeightNoteCreateWeightNote_MapProfile_Action1(IPsiService iPSIService
            //, IProductItemService iProductItemService
            )
        {
            _iPSIService = iPSIService;
        }

        public void Process(WeightNoteCreateWeightNote src, S_WeightNote dest, ResolutionContext context)
        {

            //dest.DOC_NO = _iPSIService.GetWeightNoteDocNo(src.FacSite, Core.Enums.PSIEnum.PSIType.Sale);


        }
    }
}
