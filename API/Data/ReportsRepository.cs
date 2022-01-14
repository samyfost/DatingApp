using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ReportsRepository : IReportsRepository
    {
        private readonly DataContext _context;
        public ReportsRepository(DataContext context)
        {
            _context = context;

        }

        public async Task<UserReport> GetUserReport(int sourceUserId, int reportedUserId)
        {
            return await _context.Reports.FindAsync(sourceUserId,reportedUserId);
        }

        
    
           public async Task<PagedList<ReportDto>> GetUserReports(ReportsParams reportsParams)
       {
            var users=_context.Users.OrderBy(u=>u.UserName).AsQueryable();
            var reports=_context.Reports.AsQueryable();

            if(reportsParams.Predicate=="reported")
            {
                reports=reports.Where(rep=>rep.SourceUserId==reportsParams.UserId);
                users=reports.Select(rep =>rep.ReportedUser);
            }

            if(reportsParams.Predicate=="reportedBy")
            {
                reports=reports.Where(rep=>rep.ReportedUserId==reportsParams.UserId);
                users=reports.Select(rep =>rep.SourceUser);
            }

            var  reportedUsers= users.Select(user=>new ReportDto{
                Username=user.UserName,
                PhotoUrl=user.Photos.FirstOrDefault(p =>p.IsMain).Url,
                Id=user.Id
            });

           return await PagedList<ReportDto>.CreateAsync(reportedUsers,reportsParams.PageNumber,reportsParams.PageSize);
            ;

        }
        

        public async Task<AppUser> GetUserWithReports(int userId)
        {
            return await _context.Users
            .Include(x=>x.ReportedUsers)
            .FirstOrDefaultAsync(x=>x.Id==userId);
            
    }
    }
}

    
    