using System.ComponentModel.DataAnnotations;

namespace AppNetCoreMVC_SchollSystem.DTO {

    public class SubjectDTO {

        public int Id {
            get; set;
        }

        // Ekvivalentní dva zápisy ...
        [MinLength(2), MaxLength(50)]
        [StringLength(50,MinimumLength = 2)]

        public string Name {
            get; set;
        }
    }

}
