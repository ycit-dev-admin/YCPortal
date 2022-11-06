using System;
using System.Linq;
using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Models.DTOModels;
using PSI.Service.IService;

namespace PSI.Service.AutoMapperMappActions
{
    public class SalesWeightNoteStepDataToDTOAction : IMappingAction<SalesWeightNoteStepData, DTO_SalesWeightNoteStepData>
    {
        private readonly IProductItemServiceNew _iProductItemServiceNew;
        private readonly ICodeTableServiceNew _iCodeTableServiceNew;

        public SalesWeightNoteStepDataToDTOAction()
        {
            // _iCustomerInfoService = new CustomerInfoService();
        }

        public SalesWeightNoteStepDataToDTOAction(IProductItemServiceNew iProductItemServiceNew
            , ICodeTableServiceNew iCodeTableServiceNew)
        {
            _iProductItemServiceNew = iProductItemServiceNew;
            _iCodeTableServiceNew = iCodeTableServiceNew;

        }

        public void Process(SalesWeightNoteStepData src, DTO_SalesWeightNoteStepData dest, ResolutionContext context)
        {

            dest.DTO_ProductItem = _iProductItemServiceNew.GetDTOModel<DTO_ProductItem>(aa => aa.PRODUCT_UNID == src.PRODUCT_ITEM_UNID);
            dest.DTO_ReceiveTypeInfo = _iCodeTableServiceNew.GetDTOModel<DTO_CodeTable>(aa => aa.CODE_VALUE == src.RECEIVED_TYPE.ToString());


        }
    }
}
