using AppNetCoreMVC_SchollSystem.Models;
using System.ComponentModel;

namespace AppNetCoreMVC_SchollSystem.DTO {
    public class GradeDTO{


        public int Id {
            get; set;
        }

        [DisplayName("Student ...")]
        public int StudentId {
            get; set;
        }
        public string StudentFullName {
            get; set;
        }

        [DisplayName("Subject ...")]
        public int SubjectId {
            get; set;
        }
        public string SubjectFullName {
            get; set;
        }

        [DisplayName("Topic grade")]
        public string Topic {
            get; set;
        }

        [DisplayName("Grade awarded")]
        public int Mark {
            get; set;
        }

        public DateTime Date {
            get; set;
        }

    }
}
