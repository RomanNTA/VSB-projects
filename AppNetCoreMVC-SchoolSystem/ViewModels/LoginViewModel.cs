﻿namespace AppNetCoreMVC_SchollSystem.ViewModel {
    public class LoginViewModel {

        public string UserName{ get; set; }
    
        public string Password{ get; set; }
        
        public string ReturnUrl{ get; set; }
        public bool Remember{ get; set; }

    }
}
