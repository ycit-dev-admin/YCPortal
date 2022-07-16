using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Enums;
using PSI.Core.Extensions;
using PSI.Core.Helpers;
using PSI.Core.Interfaces.Repository;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Service.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PSI.Service.Service
{
    public class SalesWeightNoteResultPriceService : ISalesWeightNoteResultPriceService
    {
        private readonly IUnitOfWork _unitOfwork;
        private readonly IGenericRepository<SalesWeightNoteResultPrice> _salesWeightNoteResultPriceRepository;

        public SalesWeightNoteResultPriceService(IUnitOfWork unitOfWork)
        {
            _unitOfwork = unitOfWork;
            _salesWeightNoteResultPriceRepository = _unitOfwork.SalesWeightNoteResultPriceRepository;
        }

        public SalesWeightNoteResultPrice GetEstimateSalesWeightNoteResultPrice(Guid salesWeightNoteDocGUID)
        {
            return _salesWeightNoteResultPriceRepository
                    .GetAsync(aa => aa.DOC_UNID == salesWeightNoteDocGUID &&
                                    aa.DATA_STEP == (int)PSIWeightNoteEnum.SWeightNotesStatus.Estimate).Result;
        }


    }
}
