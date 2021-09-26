using FluentValidation;

namespace PSI.Models.PurchaseWeightNote
{
    public class VM_PurchaseWeightNoteValidator : AbstractValidator<VM_PurchaseWeightNote>
    {
        public VM_PurchaseWeightNoteValidator()
        {

            RuleFor(x => x.FullWeightTime).NotNull().WithMessage("為必填欄位");
            RuleFor(x => x.ScaleNo).NotNull().WithMessage("為必填欄位");
            RuleFor(x => x.CustomerId).NotNull().WithMessage("為必填欄位");
            RuleFor(x => x.CustomerName).NotNull().When(x => x.CustomerId == 99).WithMessage("進貨對象為新客戶時，客戶名稱為必填");
            RuleFor(x => x.FullWeight).NotNull().WithMessage("為必填欄位").Matches(@"^\+?[1-9][0-9]*$").WithMessage("格式不正確，需為大於0的正整數"); // 非0正整數
            RuleFor(x => x.DefectiveWeight).NotNull().WithMessage("為必填欄位").Matches(@"0|^\+?[1-9][0-9]*$").WithMessage("格式不正確，需為大於等於0的整數"); // 非0正整數
            RuleFor(x => x.UnitPrice).NotNull().WithMessage("為必填欄位").Matches(@"^([1-9][0-9]*(\.[0-9]{1,2})?|0\.(?!0+$)[0-9]{1,2})$").WithMessage("格式不符，需為大於0整數最多2位小數!!");
            RuleFor(x => x.TraficUnitPrice).NotNull().WithMessage("為必填欄位").Matches(@"^([1-9][0-9]*(\.[0-9]{1,2})?|0\.(?!0+$)[0-9]{1,2})$").WithMessage("格式不符，需為大於0整數最多2位小數!!");
            RuleFor(x => x.WeightFee).NotNull().WithMessage("為必填欄位").Matches(@"0|^\+?[1-9][0-9]*$").WithMessage("格式不正確，需為大於等於0的整數"); // 非0正整數
            RuleFor(x => x.SelectPurchaseDetailInfos).NotNull().WithMessage("請至少選擇一個進貨品項");

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

