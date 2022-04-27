using FluentValidation;

namespace PSI.Areas.SysConfig.Models.PageModels
{
    public class PageContractEditCustomerContractValidator : AbstractValidator<PageContractEditCustomerContract>
    {
        public PageContractEditCustomerContractValidator()
        {

            // RuleFor(x => x.CarName).NotNull().WithMessage("為必填欄位");
            // RuleFor(x => x.CustomerGUID).NotNull().WithMessage("為必填欄位");
            RuleSet("Skip", () =>
            {
            });

        }
    }
}

