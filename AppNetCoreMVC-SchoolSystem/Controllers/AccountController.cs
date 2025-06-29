using AppNetCoreMVC_SchollSystem.Models;
using AppNetCoreMVC_SchollSystem.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AppNetCoreMVC_SchollSystem.Controllers {

    [Authorize]
    public class AccountController : Controller {

        private readonly ILogger<HomeController> _logger;

        UserManager<AppUser> _userManager;
        SignInManager<AppUser> _signInManager;

        public AccountController(ILogger<HomeController> logger,
            UserManager<AppUser> userManager, SignInManager<AppUser> signInManager) {
            _logger = logger;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [AllowAnonymous]
        public IActionResult Login(string returnUrl) {

            LoginViewModel model = new LoginViewModel();
            model.ReturnUrl = returnUrl;
            return View(model);
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel login) {

            if (ModelState.IsValid) {
                AppUser userToLogin = await _userManager.FindByNameAsync(login.UserName);
                if (userToLogin != null) {
                    var signInResult = await _signInManager.PasswordSignInAsync(
                        userToLogin, login.Password, login.Remember, false);
                    if (signInResult.Succeeded) {
                        return Redirect(login.ReturnUrl ?? "/");
                    }
                }
            }
            ModelState.AddModelError("", "User not found or not password");
            return View(login);
        }

        public async Task<IActionResult> Logout(LoginViewModel login) {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }

        public ActionResult AccountDenied() {
            return View();
           }
    }
}
