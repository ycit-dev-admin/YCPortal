using FluentValidation;
using PSI.VM_Models.Home;

namespace PSI.VM_Models.Home
{
    public class TestVMValidator : AbstractValidator<TestVM>
    {
        public TestVMValidator()
        {
            RuleFor(x => x.CarNo).NotNull().WithMessage("haha4...");            
        }
    }
}
