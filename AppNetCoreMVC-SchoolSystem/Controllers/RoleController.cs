using AppNetCoreMVC_SchollSystem.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AppNetCoreMVC_SchollSystem.Controllers {
    public class RoleController : Controller {

        private readonly ILogger<HomeController> _logger;
        RoleManager<IdentityRole> _roleManager;
        UserManager<AppUser> _userManager;

        public RoleController(RoleManager<IdentityRole> roleManager, ILogger<HomeController> logger,
            UserManager<AppUser> userManager) {
            _roleManager = roleManager;
            _logger = logger;
            _userManager = userManager;
        }

        public IActionResult Index() {
            return View(_roleManager.Roles.OrderBy(role => role.Name));
        }

        public IActionResult Create() {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(string name) {

            if (ModelState.IsValid) {
                IdentityResult result = await _roleManager.CreateAsync(new IdentityRole(name));

                if (result.Succeeded) {
                    return RedirectToAction("Index");
                } else {
                    AddIdentityErrors(result);
                }
            }
            return View(name);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(string id) {

            IdentityRole roleToDelete = await _roleManager.FindByIdAsync(id);
            if (roleToDelete != null) {
                var result = await _roleManager.DeleteAsync(roleToDelete);
                if (result.Succeeded) {
                    return RedirectToAction("Index");
                } else {
                    AddIdentityErrors(result);
                }
            }
            ModelState.AddModelError("", "role not found");
            return View("Index");
        }

        [HttpGet]
        public async Task<IActionResult> EditAsync(string id) {

            IdentityRole roleToEdit = await _roleManager.FindByIdAsync(id);
            List<AppUser> members = new List<AppUser>();
            List<AppUser> nonMembers = new List<AppUser>();

            foreach (var u in _userManager.Users) {
                var list = await _userManager.IsInRoleAsync(u, roleToEdit.Name) ?
                    members : nonMembers;
                list.Add(u);
                _logger.LogInformation("EDIT USER : " + u.UserName);

            }
            return View(new RoleState {
                Members = members,
                NonMembers = nonMembers,
                Role = roleToEdit
            });
        }

        [HttpPost]
        public async Task<IActionResult> EditAsync(RoleModification roleModification) {

            if (ModelState.IsValid) {

                foreach (var userId in roleModification.AddIds ?? new string[] { }) {
                    AppUser userToAdd = await _userManager.FindByIdAsync(userId);
                    if (userToAdd != null) {

                        IdentityResult result = await _userManager.AddToRoleAsync(
                            userToAdd, roleModification.RoleName);
                        if (!result.Succeeded) {
                            AddIdentityErrors(result);
                        }
                    }
                }

                foreach (var userId in roleModification.DeleteIds ?? new string[] { }) {
                    AppUser userToDelete = await _userManager.FindByIdAsync(userId);
                    if (userToDelete != null) {

                        IdentityResult result = await _userManager.RemoveFromRoleAsync(
                            userToDelete, roleModification.RoleName);
                        if (!result.Succeeded) {
                            AddIdentityErrors(result);
                        }
                    }
                }
                return RedirectToAction("Index");
            }
            ModelState.AddModelError("", "Špatně zadaná změna. Zkontroluje údaje.");
            return RedirectToAction("Index");
        }

        private void AddIdentityErrors(IdentityResult result) {
            foreach (var error in result.Errors) {
                ModelState.AddModelError("", error.Description);
            }
        }
    }
}
