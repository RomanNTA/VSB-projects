using AppNetCoreMVC_SchollSystem.Models;

namespace AppNetCoreMVC_SchollSystem.ViewModels {
    public class GradesDropDownViewModel {

        public IEnumerable<Student> Students { get; set; }
        public IEnumerable<Subject> Subjects { get; set; }

        public GradesDropDownViewModel() {
            Students = new List<Student>();
            Subjects = new List<Subject>();
        }
    }
}
