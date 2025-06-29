using System.ComponentModel.DataAnnotations;

namespace AppNetCoreMVC_SchollSystem.ViewModel {
    public class UserViewModel {


        /// <summary>
        /// Artibut zadání jmena
        /// </summary>
        //[Required]
        public string Name {
        get; set; }


        /// <summary>
        /// Atribut zadání Emailové adresy
        /// </summary>
        //[Required]
        [EmailAddress]
        public string Email {
        get; set; }


        /// <summary>
        /// Atribut pro heslo
        /// </summary>
        //[Required]
        public string Password {
        get; set; }

    }
}
