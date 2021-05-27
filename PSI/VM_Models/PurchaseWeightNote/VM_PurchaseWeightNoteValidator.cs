using FluentValidation;

namespace PSI.VM_Models.PurchaseWeightNote
{
    public class VM_PurchaseWeightNoteValidator : AbstractValidator<VM_PurchaseWeightNote>
    {
        public VM_PurchaseWeightNoteValidator()
        {
            RuleFor(x => x.ExcavatorOpEmpNo).NotNull().WithMessage("ffkk");            
        }
    }
}
