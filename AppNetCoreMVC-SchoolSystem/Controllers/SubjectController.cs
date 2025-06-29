using AppNetCoreMVC_SchollSystem.DTO;
using AppNetCoreMVC_SchollSystem.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AppNetCoreMVC_SchollSystem.Controllers {

    public class SubjectController : Controller {

        private readonly ILogger<HomeController> _logger;
        private SubjectService _subjectService;

        public SubjectController(SubjectService service, ILogger<HomeController> logger) {
            this._subjectService = service;
            _logger = logger;
        }

        [HttpGet] // pokud to nenapíšu, tak je to vždy HttpGet
        public IActionResult Index() {
            _logger.LogInformation("Kliknul jsi na Index");
            var allSubject = _subjectService.GetAll();
            return View(allSubject);
        }

        [HttpGet] // pokud to nenapíšu, tak je to vždy [HttpGet]
        [Authorize(Roles = "Director, Admin")]
        public IActionResult Create() {
            _logger.LogInformation("Kliknul jsi na Create");
            return View();
        }

        [HttpPost]
        [Authorize(Roles = "Director, Admin")]
        public async Task<IActionResult> CreateAsync(SubjectDTO newSubject) {
            _logger.LogInformation("Kliknul jsi na Create(POST)");
            if (!ModelState.IsValid) {
                _logger.LogError("Neplatná data");
                return View();
            }
            await _subjectService.CreateAsync(newSubject);
            return RedirectToAction("Index");
        }

        [HttpGet]
        [Authorize(Roles = "Director, Admin")]
        public async Task<IActionResult> EditAsync(int id) {
            _logger.LogInformation("Kliknul jsi na EditAsync (GET)");
            var subjectToEdit = await _subjectService.GetByIdAsync(id);
            if (subjectToEdit == null) {
                return View("NotFound");
            }
            return View(subjectToEdit);
        }

        [HttpPost]
        [Authorize(Roles = "Director, Admin")]
        public async Task<IActionResult> EditAsync(SubjectDTO subjectDTO, int id) {
            _logger.LogInformation("Kliknul jsi na EditAsync (GET)");
            await _subjectService.UpdateAsync(subjectDTO, id);
            return RedirectToAction("Index");
        }

        [HttpPost]
        [Authorize(Roles = "Director, Admin")]
        public async Task<IActionResult> DeleteAsync(int id) {
            _logger.LogInformation("Kliknul jsi na DeleteAsync (POST)");
            await _subjectService.DeleteAsync(id);
            return RedirectToAction("Index");
        }

    }
}
