using Microsoft.AspNetCore.Identity;

namespace PSI.Core.Entities.Identity
{
    public class AppUser : IdentityUser
    {
        public string NICK_NAME { get; set; }
        public string FAC_SITE { get; set; }
        public string EMPLOYEE_NO { get; set; }
        public int AUTHORITY_LEVEL { get; set; }  //  0:預設權限   1: 進階權限  2:管理1權限  3:管理2權限   9:管理員權限
    }
}
