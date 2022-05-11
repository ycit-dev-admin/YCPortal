using FluentValidation;

namespace PSI.Areas.SysConfig.Models.PageModels
{
    public class PageCreateCarNoInfoValidator : AbstractValidator<PageCreateCarNoInfo>
    {
        public PageCreateCarNoInfoValidator()
        {

            RuleFor(x => x.CarName).NotNull().WithMessage("為必填欄位");
            // RuleFor(x => x.CustomerGUID).NotNull().WithMessage("為必填欄位");

            //RuleFor(x => x.SelectPurchaseDetailInfos).NotNull().WithMessage("請至少選擇一個進貨品項");

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

