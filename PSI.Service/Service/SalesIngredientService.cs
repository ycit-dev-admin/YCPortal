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
    public class SalesIngredientService : ISalesIngredientService
    {
        private readonly IUnitOfWork _unitOfwork;
        private readonly IGenericRepository<S_WeightNote_Ingredient> _salesIngredientRepository;

        public SalesIngredientService(IUnitOfWork unitOfWork)
        {
            _unitOfwork = unitOfWork;
            _salesIngredientRepository = _unitOfwork.SalesIngredientRepository;
        }


        public IQueryable<S_WeightNote_Ingredient> GetSalesIngredients(Guid weightNoteGUID)
        {
            return _salesIngredientRepository.GetAllAsync().Result
                .Where(aa => aa.SALES_WEIGHTNOTE_UNID == weightNoteGUID).AsQueryable();
        }

        public IQueryable<S_WeightNote_Ingredient> GetSalesIngredients(List<Guid> weightNoteGUIDs)
        {
            return _salesIngredientRepository.GetAllAsync()
                .Result.Where(aa => weightNoteGUIDs.Contains(aa.SALES_WEIGHTNOTE_UNID)).AsQueryable();
        }



    }
}
