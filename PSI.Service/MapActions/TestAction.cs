using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Enums;
using PSI.Core.Models.DTOModels;
using PSI.Service.IService;

namespace PSI.Service.MapActions
{
    public class TestAction : IMappingAction<DTO_SalesWeightNote, S_WeightNote>
    {
        private readonly IPsiService _iPsiService;
        //private readonly UserManager<AppUser> _userManager;

        public TestAction()
        {

        }

        public TestAction(IPsiService iPsiService, UserManager<AppUser> userManager)
        {
            _iPsiService = iPsiService ?? throw new ArgumentNullException(nameof(iPsiService));
            //_userManager = userManager;
        }

        public void Process(DTO_SalesWeightNote source, S_WeightNote destination, ResolutionContext context)
        {
            //var operUser = _userManager.GetUserAsync(User).Result;
            destination.DOC_NO = _iPsiService.GetWeightNoteDocNo("A", PSIEnum.PSIType.Sale);
        }
    }
}