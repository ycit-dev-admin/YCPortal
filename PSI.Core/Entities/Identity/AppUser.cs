using Microsoft.AspNetCore.Identity;

namespace PSI.Core.Entities.Identity
{
    public class AppUser : IdentityUser
    {
        public string NickName { get; set; }
        public string FacSite { get; set; }
        //  public string EMPLOYEE_NO { get; set; }
    }
}
