using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class UserReport
    {
        public AppUser SourceUser { get; set; }
        public int SourceUserId { get; set; }

        public AppUser ReportedUser { get; set; }
        public int ReportedUserId { get; set; }
       
    }
}