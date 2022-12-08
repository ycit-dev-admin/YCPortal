using System;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Enums;
using PSI.Core.Models.DTOModels;
using PSI.Core.Models.PageModels.Areas.Sales;
using PSI.Service.IService;

namespace PSI.Service.AutoMapperMappActions
{
    public class WeightNoteCreateWeightNote_ToEntityAction : IMappingAction<WeightNoteCreateWeightNote, S_WeightNote>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IPsiService _psiService;


        public WeightNoteCreateWeightNote_ToEntityAction()
        {
            // _iCustomerInfoService = new CustomerInfoService();
        }

        public WeightNoteCreateWeightNote_ToEntityAction(UserManager<AppUser> userManager
            , IPsiService psiService
            )
        {
            _userManager = userManager;
            _psiService = psiService;
        }

        public void Process(WeightNoteCreateWeightNote src, S_WeightNote dest, ResolutionContext context)
        {
           
            //dest.DTO_SalesIngredients = _iSalesIngredientServiceNew.GetDTOModels<DTO_SalesIngredient>(aa => aa.SALES_WEIGHTNOTE_UNID == src.UNID);
            //dest.DTO_CustomerInfo = _iCustomerInfoServiceNew.GetDTOModel<DTO_CustomerInfo>(aa => aa.CUSTOMER_GUID == src.CUSTOMER_UNID);
            //dest.DTO_SalesWeightNoteStepDatas = _iSalesWeightNoteStepDataService.GetDTOModels<DTO_SalesWeightNoteStepData>(aa => aa.DOC_UNID == src.UNID);
            //dest.DTO_CustomerCar = _iCarNoServiceNew.GetDTOModel<DTO_CustomerCar>(aa => aa.CAR_GUID == src.CARNO_UNID);
            //dest.DTO_CustomerContracts = _iCustomerContractServiceNew.GetDTOModels<DTO_CustomerContract>(aa => aa.CUSTOMER_GUID == src.CUSTOMER_UNID);



        }
    }
}
