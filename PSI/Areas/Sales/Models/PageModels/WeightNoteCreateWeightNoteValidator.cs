using System;
using FluentValidation;

namespace PSI.Areas.Sales.Models.PageModels
{
    public class WeightNoteCreateWeightNoteValidator : AbstractValidator<WeightNoteCreateWeightNote>
    {
        public WeightNoteCreateWeightNoteValidator()
        {

            RuleFor(x => x.LeaveWeightTime).NotNull().WithMessage("為必填欄位");
            RuleFor(x => x.ScaleNo).NotNull().WithMessage("為必填欄位");
            RuleFor(x => x.CustomerUNID).NotNull().WithMessage("為必填欄位");
            //RuleFor(x => x.CustomerName).NotNull().When(x => string.IsNullOrEmpty(x.CustomerUNID.ToString())).WithMessage("進貨對象為新客戶時，客戶名稱為必填");
            RuleFor(x => x.CarNoUNID).NotNull().WithMessage("為必填欄位");
            //RuleFor(x => x.HasTax).NotNull().WithMessage("為必填欄位");
            //RuleFor(x => x.CarNo).NotNull().When(x => string.IsNullOrEmpty(x.CarNoUNID)).WithMessage("為新車牌的時候，車牌名稱為必填");
            RuleFor(x => x.LeaveWeight.ToString()).NotNull().WithMessage("為必填欄位").Matches(@"^\+?[1-9][0-9]*$").WithMessage("格式不正確，需為大於0的正整數"); // 非0正整數
            RuleFor(x => x.DefectiveWeight.ToString()).NotNull().WithMessage("為必填欄位").Matches(@"0|^\+?[1-9][0-9]*$").WithMessage("格式不正確，需為大於等於0的整數"); // 非0正整數
            RuleFor(x => x.UnitPrice.ToString()).NotNull().WithMessage("為必填欄位").Matches(@"^([1-9][0-9]*(\.[0-9]{1,2})?|0\.(?!0+$)[0-9]{1,2})$").WithMessage("格式不符，需為大於0整數最多2位小數!!");
            RuleFor(x => x.TraficUnitPrice.ToString()).NotNull().WithMessage("為必填欄位").Matches(@"^([0-9][0-9]*(\.[0-9]{1,2})?|0\.(?!0 +$)[0-9]{1,2})$").WithMessage("格式不符，需為大於等於0整數最多2位小數!!");
            //RuleFor(x => x.ThirdWeightFee.ToString()).NotNull().WithMessage("為必填欄位").Matches(@"0|^\+?[1-9][0-9]*$").WithMessage("格式不正確，需為大於等於0的整數"); // 非0正整數
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

