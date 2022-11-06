using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Core.Enums;
using PSI.Core.Models.DTOModels;
using PSI.Models.PEModels;

namespace PSI.Areas.Sales.Models.PageModels
{
    public class WeightNoteQueryList
    {
        public string FacSite { get; set; }
        public int? UserAuthorityLevel { get; set; }
        // Entities
        public List<DTO_SalesWeightNote> DTOSalesWeightNotes { get; set; }

        // Page
        //public List<SelectListItem> CustomerInfoItems { get; set; }
        //public List<SelectListItem> PayTypeItems { get; set; }

        //public List<PE_SalesIngredient> PESalesIngredients { get; set; }
        public List<SelectListItem> FacSiteItems { get; set; }
    }
}
