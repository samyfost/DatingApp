using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class ReportsController : BaseApiController
    {
          private readonly IUnitOfWork _unitOfWork;
       
        public ReportsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            
        }

       [HttpPost("{username}")]
        public async Task<ActionResult> AddReport(string username)
        {
            var sourceUserId = User.GetUserId();
            var reportedUser = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);
            var sourceUser = await _unitOfWork.ReportsRepository.GetUserWithReports(sourceUserId);

            if(reportedUser == null) return NotFound();

            var userReport = await _unitOfWork.ReportsRepository.GetUserReport(sourceUserId,reportedUser.Id);

            userReport = new UserReport
            {
                SourceUserId = sourceUserId,
                ReportedUserId = reportedUser.Id
            };
            sourceUser.ReportedUsers.Add(userReport);

            if(await _unitOfWork.Complete()) return Ok();

            return BadRequest("Failed to report user");
        }
    
        [HttpGet]

        public async Task<ActionResult<IEnumerable<ReportDto>>> GetUserReports([FromQuery] ReportsParams reportsParams)
        {
            reportsParams.UserId=User.GetUserId();
            var users = await _unitOfWork.ReportsRepository.GetUserReports(reportsParams);

            Response.AddPaginationHeader(users.CurrentPage,users.PageSize,users.TotalCount,users.TotalPages);


            return Ok(users);
        }
    }
    
}