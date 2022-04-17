using FluentValidation;

namespace PSI.Areas.SysConfig.Models.PageModels
{
    public class PageCustomerEditCustomerInfoValidator : AbstractValidator<PageCustomerEditCustomerInfo>
    {
        public PageCustomerEditCustomerInfoValidator()
        {

            // RuleFor(x => x.CarName).NotNull().WithMessage("為必填欄位");
            // RuleFor(x => x.CustomerGUID).NotNull().WithMessage("為必填欄位");
            RuleSet("Skip", () =>
            {
            });

        }
    }
}

