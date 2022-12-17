using System;
using System.Linq;
using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Enums;
using PSI.Core.Models.DTOModels;
using PSI.Service.IService;

namespace PSI.Service.AutoMapperProfiles.Entity
{
    public class S_WeightNote_Ingredient_MapProfile_Action1 : IMappingAction<S_WeightNote_Ingredient, DTO_S_WeightNote_Ingredient>
    {
        private readonly IGenericService<PS_WriteOff_Log> _iPsWriteOffLogService;
        private readonly IGenericService<P_Inventory> _iPInventoryService;

        public S_WeightNote_Ingredient_MapProfile_Action1()
        {
            // _iCustomerInfoService = new CustomerInfoService();
        }

        public S_WeightNote_Ingredient_MapProfile_Action1(IGenericService<PS_WriteOff_Log> ipsWriteOffLogService
            , IGenericService<P_Inventory> iPInventoryService
            )
        {
            _iPsWriteOffLogService = ipsWriteOffLogService;
            _iPInventoryService = iPInventoryService;
        }

        public void Process(S_WeightNote_Ingredient src, DTO_S_WeightNote_Ingredient dest, ResolutionContext context)
        {
            var writeOffLogInfo = _iPsWriteOffLogService.GetDTOModels<DTO_PS_WriteOff_Log>(aa => aa.SALES_WEIGHTNOTE_UNID == src.SALES_WEIGHTNOTE_UNID &&
            aa.PRODUCT_UNID == src.PRODUCT_UNID &&
            aa.WRITEOFF_STATUS == (int)S_Enum.WriteOffLogStatus.Available);

            var pInventoriesInfo = _iPInventoryService.GetDTOModels<DTO_P_Inventory>(aa => aa.PRODUCT_UNID == src.PRODUCT_UNID &&
            aa.STATUS == (int)P_Enum.P_InventoryStatus.HasInventory);
            var pInventoriesDic = pInventoriesInfo.GroupBy(aa => (aa.PURCHASE_WEIGHTNOTE_UNID))
             .ToDictionary(x => x.Key, x => x.FirstOrDefault());

            dest.SumWriteOffWeight = writeOffLogInfo.Sum(aa => aa.WRITEOFF_WEIGHT);
            var sumWriteOffPrice = writeOffLogInfo.Sum(aa => aa.WRITEOFF_WEIGHT * pInventoriesDic[(aa.PURCHASE_WEIGHTNOTE_UNID)].UNIT_PRICE);
            dest.CostUnitPrice = sumWriteOffPrice / dest.SumWriteOffWeight;
            dest.RelPDocNoWithKgAndPrice = writeOffLogInfo.Select(aa =>
            $@"({pInventoriesDic[aa.PURCHASE_WEIGHTNOTE_UNID].PURCHASE_DOC_NO} => {aa.WRITEOFF_WEIGHT}kg , 單價:{pInventoriesDic[(aa.PURCHASE_WEIGHTNOTE_UNID)].UNIT_PRICE})")
                .ToArray();


            //var writeOffLogJoinRs = writeOffLogInfo.Join(pInventoriesInfo,
            //                       o => new { o.PURCHASE_WEIGHTNOTE_UNID, o.PRODUCT_UNID },

            //                        p => new { p.PURCHASE_WEIGHTNOTE_UNID, p.PRODUCT_UNID },
            //                           (writeOffLog, pInventory) => new KeyValuePair<(Guid, Guid), DTO_P_Inventory>(
            //                               (writeOffLog.PURCHASE_WEIGHTNOTE_UNID, writeOffLog.PRODUCT_UNID),
            //                               pInventory)
            //                           ).ToDictionary(x => x.Key, x => x.Value);
            //var qqq = pInventoriesInfo.GroupBy(aa => new { aa.PURCHASE_WEIGHTNOTE_UNID, aa.PRODUCT_UNID })
            //    .ToDictionary(x => x.Key, x => x.Select(bb => bb).ToList());



        }
    }
}
