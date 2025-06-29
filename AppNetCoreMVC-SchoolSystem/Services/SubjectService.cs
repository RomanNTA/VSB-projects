using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AppNetCoreMVC_SchollSystem.DTO;
using AppNetCoreMVC_SchollSystem.Models;

namespace AppNetCoreMVC_SchollSystem.Services {

    public class SubjectService {

        private AppDBContext _dbContext;

        public SubjectService(AppDBContext dBContext) {
            _dbContext = dBContext;
        }

        public List<SubjectDTO> GetAll() {
            
            var allSubject = _dbContext.Subjects.ToList();
            var subjectDtos = new List<SubjectDTO>();
            foreach (var subject in allSubject) {
                subjectDtos.Add(ModelToDto(subject)); 
            }
            return subjectDtos;
        }
        internal async Task CreateAsync(SubjectDTO newSubject) {
            Subject subjectToSave = DtoToModel(newSubject);
            await _dbContext.Subjects.AddAsync(subjectToSave);
            await _dbContext.SaveChangesAsync();
        }
 
        private Subject DtoToModel(SubjectDTO subj) {
            return new Subject() {
                Name = subj.Name,
                Id = subj.Id,
            };
        }

        internal async Task<SubjectDTO> GetByIdAsync(int id) {
            var x = await _dbContext.Subjects.FindAsync(id);
            if (x == null){
                return null;
            }
            return ModelToDto(x);
        }

        internal async Task UpdateAsync(SubjectDTO subjectDTO, int id) {
            _dbContext.Update(DtoToModel(subjectDTO));
            await _dbContext.SaveChangesAsync();
        }

        private SubjectDTO ModelToDto(Subject? subj) {
            return new SubjectDTO() {
                Name = subj.Name,
                Id = subj.Id,
            };
        }

        internal async Task DeleteAsync(int id) {
            var subject = await _dbContext.Subjects.FindAsync(id);
            if (subject != null) {
                _dbContext.Subjects.Remove(subject);
            }
            await _dbContext.SaveChangesAsync();
        }

    }
}
