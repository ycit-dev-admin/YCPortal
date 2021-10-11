using FluentValidation;
using PSI.Areas.SysConfig.Models;

namespace PSI.Models.PurchaseWeightNote
{
    public class VM_Create_CustomerInfoValidator : AbstractValidator<VM_Create_CustomerInfo>
    {
        public VM_Create_CustomerInfoValidator()
        {

            RuleFor(x => x.CompanyName).NotNull().WithMessage("為必填欄位");
            RuleFor(x => x.CustomerName).NotNull().WithMessage("為必填欄位");

            RuleSet("Skip", () =>
            {
            });


            //RuleFor(x => x.IsPassPurchase).Must(x => x == true).WithMessage("請至少選擇一個進貨品項");
            //RuleFor(x => x.FullWeightTime).NotNull().WithMessage("為必填欄位99");
            //RuleFor(x => x.ScaleNo).NotNull().WithMessage("為必填欄位98");

            //RuleForEach(x => x.Wowgogo).NotNull().NotEmpty().WithMessage("abcd");
            //RuleFor(x => x.Wowgogo).Must(x=> x is)

        }
    }
}

