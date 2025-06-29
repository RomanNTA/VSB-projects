using Microsoft.AspNetCore.Identity;

namespace AppNetCoreMVC_SchollSystem.Models {
    public class RoleState {

        public IdentityRole Role {
        get; set; }

        public IEnumerable<AppUser> Members { get; set; }
        
        public IEnumerable<AppUser> NonMembers { get; set; }





    }
}
