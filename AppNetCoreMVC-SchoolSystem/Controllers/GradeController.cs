using AppNetCoreMVC_SchollSystem.DTO;
using AppNetCoreMVC_SchollSystem.Services;
using AppNetCoreMVC_SchollSystem.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace AppNetCoreMVC_SchollSystem.Controllers {

    
    public class GradeController : Controller {

        GradeService _gradeService;
        private readonly ILogger<HomeController> _logger;

        public GradeController(GradeService gradeService, ILogger<HomeController> logger) {
            _logger = logger;
            _gradeService = gradeService;
        }

        public IActionResult Index() {
            IEnumerable<GradeDTO> allGrades = _gradeService.GetAll();
            return View(allGrades);
        }

        public void FillDropDowns() {
            GradesDropDownViewModel gradesDropDownData =
                _gradeService.GetGradesDropDownData();

            ViewBag.Students = new SelectList(gradesDropDownData.Students, "Id", "LastName");
            // V SelecteListu je nějaký List,
            // "Id" ... co chceme vrátit a
            // "LastName" ...co se zobrazí

            ViewBag.Subjects = new SelectList(gradesDropDownData.Subjects, "Id", "Name");
            // ViewBag putuje s view a nepíše se do dalšího View !!!!!!!!!!!!

        }

        [Authorize(Roles = "Teacher, Admin")]
        public IActionResult Create() {
            FillDropDowns();
            return View();
        }

        [Authorize(Roles = "Teacher, Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateAsync(GradeDTO newGrade) {
            await _gradeService.CreateAsync(newGrade);
            return RedirectToAction("Index");
        }

        // Editace
        [Authorize(Roles = "Teacher, Admin")]
        [HttpGet]
        public async Task<IActionResult> EditAsync(int id, GradeDTO gradeDTO) {
            _logger.LogInformation("Kliknul jsi na EDIT GRADE");
            GradeDTO gradeToEdit = await _gradeService.FindByIdAsync(id);
            if (gradeToEdit == null) {
                return View("NotFound");
            }
            FillDropDowns();
            return View(gradeToEdit);
        }

        // Editace
        [Authorize(Roles = "Teacher, Admin")]
        [HttpPost]
        public async Task<IActionResult> EditAsync(GradeDTO gradeDTO) {

            _logger.LogInformation("Kliknul jsi na EDIT GRADE - POST");

            await _gradeService.UpdateAsync(gradeDTO);
            return RedirectToAction("Index"); ;
        }

        // Delete
        [Authorize(Roles = "Teacher, Admin")]
        [HttpPost]
        public async Task<IActionResult> DeleteAsync(int id) {

            _logger.LogInformation("Kliknul jsi na Delete GRADE - POST");

            await _gradeService.DeleteAsync(id);    
            return RedirectToAction("Index"); ;
        }
    }
}
