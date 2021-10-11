using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;

namespace PSI.Core.Entities.Identity
{
    public class AppUser : IdentityUser
    {
        public string NickName { get; set; }
    }
}
