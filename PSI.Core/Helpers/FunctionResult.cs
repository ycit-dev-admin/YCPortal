using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Helpers
{
    public interface IBaseResult
    {
        string ActionMessage { get; }
        bool Success { get; }
        void ResultSuccess(string siccessMessage = "");
        void ResultFailure(string failureMessage = "");
    }

    public class BaseResult : IBaseResult
    {
        public bool Success { get; set; }
        public string ActionMessage { get; set; }
        public void ResultFailure(string failureMessage = "")
        {
            this.ActionMessage = failureMessage;
            this.Success = false;

        }
        public void ResultSuccess(string successMessage = "")
        {
            this.ActionMessage = successMessage;
            this.Success = true;
        }
    }
    public class FunctionResult : BaseResult
    {
        public FunctionResult()
        {

        }
        public FunctionResult(object classObj)
        {

        }



    }
    public class FunctionResult<T> : BaseResult
    {
        public T ResultValue { get; set; }
        public FunctionResult()
        {

        }
        public FunctionResult(object classObj)
        {

        }

        public void ResultSuccess(string successMessage, T resultValue)
        {
            this.ResultValue = resultValue;
            this.ActionMessage = successMessage;
            this.Success = true;
        }
    }
}
