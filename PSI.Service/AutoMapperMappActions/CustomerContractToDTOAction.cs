using System;
using System.Linq;
using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Enums;
using PSI.Core.Models.DTOModels;
using PSI.Service.IService;

namespace PSI.Service.AutoMapperMappActions
{
    public class CustomerContractToDTOAction : IMappingAction<CustomerContract, DTO_CustomerContract>
    {
        private readonly ISalesWeightNoteStepDataService _iSalesWeightNoteStepDataService;
        private readonly ISalesWeightNoteService _iSalesWeightNoteService;

        public CustomerContractToDTOAction()
        {
            // _iCustomerInfoService = new CustomerInfoService();
        }

        public CustomerContractToDTOAction(ISalesWeightNoteStepDataService iSalesWeightNoteStepDataService
            , ISalesWeightNoteService iSalesWeightNoteService
            )
        {
            _iSalesWeightNoteStepDataService = iSalesWeightNoteStepDataService;
            _iSalesWeightNoteService = iSalesWeightNoteService;
            //_iCodeTableServiceNew = iCodeTableServiceNew;

        }

        public void Process(CustomerContract src, DTO_CustomerContract dest, ResolutionContext context)
        {
            // Rel DTOs
            dest.DTO_SalesWeightNotes = _iSalesWeightNoteService
                .GetDTOModels<DTO_S_WeightNote>(aa => aa.CONTRACT_UNID == src.CONTRACT_GUID);

            // DTO Values
            var docUNIDs = dest.DTO_SalesWeightNotes.Select(aa => aa.UNID);
            var dtoSalesWeightNoteStepDatas = _iSalesWeightNoteStepDataService
                .GetDTOModels<DTO_SalesWeightNoteStepData>(aa => docUNIDs.Contains(aa.DOC_UNID) &&
                                                                 aa.DATA_STEP == (int)S_Enum.WeightNotesStatus.Customer);
            dest.SumEffectivedSalesWeight = dtoSalesWeightNoteStepDatas.Sum(aa => aa.SALES_WEIGHT - aa.DEFECTIVE_WEIGHT);
            //dest.DTO_ReceiveTypeInfo = _iCodeTableServiceNew.GetDTOModel<DTO_CodeTable>(aa => aa.CODE_VALUE == src.RECEIVED_TYPE.ToString());


        }
    }
}
