using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IReportsRepository
    {
        Task<UserReport> GetUserReport(int sourceUserId,int reportedUserId);
        Task<AppUser> GetUserWithReports(int userId);
        Task<PagedList<ReportDto>> GetUserReports(ReportsParams reportParams);
        

    }
}