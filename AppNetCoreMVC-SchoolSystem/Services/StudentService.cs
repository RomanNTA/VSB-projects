using AppNetCoreMVC_SchollSystem.DTO;
using AppNetCoreMVC_SchollSystem.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace AppNetCoreMVC_SchollSystem.Services {
    public class StudentService {

        private AppDBContext _dbContext;

        public StudentService(AppDBContext dBContext) {
            _dbContext = dBContext;
        }

        public List<StudentDTO> GetAll() {
            
            var allStudents = _dbContext.Students.ToList();
            var studentDtos = new List<StudentDTO>();
            foreach (var student in allStudents) {
                StudentDTO studentDTO = ModelToDto(student);
                studentDtos.Add(studentDTO); 
            }
            return studentDtos;
        }
        internal async Task CreateAsync(StudentDTO newStudent) {
            Student studentToSave = DtoToModel(newStudent);
            await _dbContext.Students.AddAsync(studentToSave);
            await _dbContext.SaveChangesAsync();
        }
 
        private Student DtoToModel(StudentDTO student) {
            return new Student() {
                DateOfBirth = student.DateOfBirth,
                FirstName = student.FirstName,
                LastName = student.LastName,
                Email = student.Email,
                Id = student.Id,
            };
        }

        internal async Task<StudentDTO> GetByIdAsync(int id) {
            return ModelToDto(await _dbContext.Students.FindAsync(id));
        }

        internal async Task UpdateAsync(StudentDTO studentDTO, int id) {
            _dbContext.Update(DtoToModel(studentDTO));
            await _dbContext.SaveChangesAsync();
        }

        private StudentDTO ModelToDto(Student? student) {
            return new StudentDTO() {
                DateOfBirth = student.DateOfBirth,
                FirstName = student.FirstName,
                LastName = student.LastName,
                Id = student.Id,
                Email = student.Email,
            };
        }


        internal async Task DeleteAsync(int id) {
            var student = await _dbContext.Students.FindAsync(id);
            if (student != null) {
                _dbContext.Students.Remove(student);
            }
            await _dbContext.SaveChangesAsync();
        }

        internal IEnumerable<StudentDTO> GetByName(string q) {
            var nameParts = q.Split(',');
            var studentsThatMatch = _dbContext.Students
                .Where(st => st.LastName == nameParts[0].Trim())
                .Where(st => st.FirstName == nameParts[1].Trim());

            List<StudentDTO> returnedStudents = new List<StudentDTO>();
            foreach (var student in studentsThatMatch) {
                returnedStudents.Add(ModelToDto(student));
            }
            return returnedStudents;
            
        }
    }
}
