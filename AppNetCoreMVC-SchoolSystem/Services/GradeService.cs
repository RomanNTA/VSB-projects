using AppNetCoreMVC_SchollSystem.Controllers;
using AppNetCoreMVC_SchollSystem.DTO;
using AppNetCoreMVC_SchollSystem.Models;
using AppNetCoreMVC_SchollSystem.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace AppNetCoreMVC_SchollSystem.Services {
    public class GradeService {

        private AppDBContext _dbContext;
        private readonly ILogger<HomeController> _logger;

        public GradeService(AppDBContext dBContext, ILogger<HomeController> logger) {
            _dbContext = dBContext;
            _logger = logger;
        }

        internal async Task CreateAsync(GradeDTO newGrade) {
            Grade gradeToInsert = await DTOToModelAsync(newGrade);
            await _dbContext.Grades.AddAsync(gradeToInsert);
            await _dbContext.SaveChangesAsync();
        }

        private async Task<Grade> DTOToModelAsync(GradeDTO newGrade) {
            return new Grade() {
                Mark = newGrade.Mark,
                Topic = newGrade.Topic,
                Student = await _dbContext.Students.FindAsync(newGrade.StudentId),
                Subject = await _dbContext.Subjects.FindAsync(newGrade.SubjectId),
                Date = DateTime.Now,
                Id = newGrade.Id,
            };
        }

        internal async Task<GradeDTO> FindByIdAsync(int id) {

            var gradeToReturn = await _dbContext.Grades.Include(gr => gr.Subject)
                .Include(gr => gr.Student).FirstOrDefaultAsync(gr => gr.Id == id);

            if (gradeToReturn == null) {
                return null;
            }
            return ModelToDTO(gradeToReturn);
        }

        internal IEnumerable<GradeDTO> GetAll() {

            var allGrades = _dbContext.Grades.Include(gr=> gr.Student).Include(gr=>gr.Subject);

            List<GradeDTO> gradesDTOs = new List<GradeDTO>();

            foreach (var grade in allGrades) {
                gradesDTOs.Add(ModelToDTO(grade));
            }
            return gradesDTOs;
        }

    internal GradesDropDownViewModel GetGradesDropDownData() {

        return new GradesDropDownViewModel() {
            Students = _dbContext.Students.OrderBy(x => x.LastName),
            Subjects = _dbContext.Subjects.OrderBy(x => x.Name),
        };
    }

        public GradeDTO ModelToDTO(Grade grade) {

            return new GradeDTO() {
                Mark = grade.Mark,
                Topic = grade.Topic,
                StudentId = grade.Student.Id,
                SubjectId = grade.Subject.Id,
                Date = grade.Date,
                Id = grade.Id,
                SubjectFullName = grade.Subject.Name,
                StudentFullName = grade.Student.FirstName + " " + grade.Student.LastName,
            };
        }

        internal async Task UpdateAsync(GradeDTO gradeDTO) {
            
            Grade gradeToSave = await DTOToModelAsync(gradeDTO);
            _dbContext.Grades.Update(gradeToSave); 
            await _dbContext.SaveChangesAsync();
        }

        internal async Task DeleteAsync(int gradeToDeleteId) {

            var gradeDelete = await _dbContext.Subjects.FindAsync(gradeToDeleteId);
            if (gradeDelete != null) {
                _dbContext.Subjects.Remove(gradeDelete);
            }
            await _dbContext.SaveChangesAsync();
        }

    }
}
