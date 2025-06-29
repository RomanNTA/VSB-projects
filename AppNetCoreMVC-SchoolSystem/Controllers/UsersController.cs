using AppNetCoreMVC_SchollSystem.Models;
using AppNetCoreMVC_SchollSystem.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics.Eventing.Reader;

namespace AppNetCoreMVC_SchollSystem.Controllers {

    [Authorize(Roles = "Admin")]
    public class UsersController : Controller {

        private readonly ILogger<HomeController> _logger;

        UserManager<AppUser> _userManager;
        IPasswordHasher<AppUser> _passwordHasher;
        IPasswordValidator<AppUser> _passwordValidator;

        public UsersController(UserManager<AppUser> userManager, ILogger<HomeController> logger,
            IPasswordHasher<AppUser> passwordHasher, IPasswordValidator<AppUser> passwordValidator) {

            _userManager = userManager;
            _logger = logger;
            _passwordHasher = passwordHasher;
            _passwordValidator = passwordValidator;
        }

        public IActionResult Index() {
            return View(_userManager.Users);
        }

        public IActionResult Create() {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(UserViewModel newUser) {

            if (ModelState.IsValid) {
                AppUser userToAdd = new AppUser {
                    UserName = newUser.Name,
                    Email = newUser.Email,
                };
                IdentityResult result = await _userManager.CreateAsync(userToAdd, newUser.Password);
                if (result.Succeeded) {
                    return RedirectToAction("Index");
                } else {
                    foreach (var err in result.Errors) {
                        ModelState.AddModelError("", err.Description);
                    }
                }
            }
            return View(newUser);
        }

        public async Task<IActionResult> EditAsync(string id) {

            AppUser userToEdit = await _userManager.FindByIdAsync(id);

            if (userToEdit == null) {
                return View("NotFound");
            }
            return View(userToEdit);
        }

        [HttpPost]
        public async Task<IActionResult> EditAsync(string id, string email, string password) {

            AppUser userToEdit = await _userManager.FindByIdAsync(id);
            if (userToEdit == null) {
                return View("NotFound");
            }

            if (!email.IsNullOrEmpty() != null) {
                userToEdit.Email = email;
            } else {
                ModelState.AddModelError("", "E-mail cannot be empty.");
            }

            IdentityResult validPass = null;
            if (!password.IsNullOrEmpty() != null) {
                validPass = await _passwordValidator.ValidateAsync(_userManager, userToEdit, password);
                if (validPass.Succeeded) {
                    userToEdit.PasswordHash = _passwordHasher.HashPassword(userToEdit, password);
                } else {
                    //ModelState.AddModelError("", "Password not correct.");
                    AddIdentityErrors(validPass);
                }
            } else {
                ModelState.AddModelError("", "Password cannot be empty.");
            }
            //
            if (!email.IsNullOrEmpty() && !password.IsNullOrEmpty()) {
                if (validPass.Succeeded) {

                    IdentityResult result = await _userManager.UpdateAsync(userToEdit);
                    
                    if (result.Succeeded) {
                        return RedirectToAction("Index");
                    } else {
                        AddIdentityErrors(result);
                    }
                }
            }
            return View(userToEdit);
        }

        [HttpPost]
        public async Task<IActionResult> DeleteAsync(string id) {

            AppUser userToDelete = await _userManager.FindByIdAsync(id);

            if (userToDelete != null) {
                IdentityResult result = await _userManager.DeleteAsync(userToDelete);
                if (result.Succeeded) {
                    return RedirectToAction("Index");
                } else {
                    AddIdentityErrors(result);
                }
            } else {
                ModelState.AddModelError("", "User not found");
            }
            ModelState.AddModelError("", "Chyba nenalezena");
            return View("Index", _userManager.Users);
        }

        void AddIdentityErrors(IdentityResult result) {
            foreach (var err in result.Errors) {
                ModelState.AddModelError("", err.Description);
            }
        }
    }
}
    