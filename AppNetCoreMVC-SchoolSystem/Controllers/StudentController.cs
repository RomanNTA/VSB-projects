using AppNetCoreMVC_SchollSystem.DTO;
using AppNetCoreMVC_SchollSystem.Models;
using AppNetCoreMVC_SchollSystem.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AppNetCoreMVC_SchollSystem.Controllers {

    public class StudentController : Controller {

        private readonly ILogger<HomeController> _logger;
        private StudentService _studentService;

        public StudentController(StudentService studentService, ILogger<HomeController> logger) {
            _studentService = studentService;
            _logger = logger;
            
        }

        [HttpGet] // pokud to nenapíšu, tak je to vždy HttpGet
        public IActionResult Index() {
            _logger.LogInformation("Kliknul jsi na Index");
            var allStudents = _studentService.GetAll();
            return View(allStudents);
        }

        [HttpGet] // pokud to nenapíšu, tak je to vždy [HttpGet]
        public IActionResult Create() {
            _logger.LogInformation("Kliknul jsi na Create");
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(StudentDTO newStudent) {
            _logger.LogInformation("Kliknul jsi na Create(POST)");
            await _studentService.CreateAsync(newStudent);
            return RedirectToAction("Index");
        }

        [HttpGet]
        public async Task<IActionResult> EditAsync(int id) {
            _logger.LogInformation("Kliknul jsi na EditAsync (GET)");
            var studentToEdit = await _studentService.GetByIdAsync(id);
            return View(studentToEdit);
        }

        [HttpPost]
        public async Task<IActionResult> EditAsync(StudentDTO studentDTO, int id) {
            _logger.LogInformation("Kliknul jsi na EditAsync (GET)");
            await _studentService.UpdateAsync(studentDTO, id);
            return RedirectToAction("Index");
        }

        [HttpPost]
        public async Task<IActionResult>DeleteAsync(int id) {
            _logger.LogInformation("Kliknul jsi na DeleteAsync (POST)");
            await _studentService.DeleteAsync(id);
            return RedirectToAction("Index");
        }

        [HttpGet]
        public async Task<IActionResult> GetToDelete(int id) {
            _logger.Log(LogLevel.Information, "Kliknul jsi na DELETE ASYNC POST");
            var student = await _studentService.GetByIdAsync(id);
            return View(student);
        }

        [HttpGet]
        public IActionResult Search(string q) {
            _logger.LogInformation("Kliknul jsi na SearchAsync (GET)");

            var studentSearchList = _studentService.GetByName(q);
            return View("Index", studentSearchList);
        }
    }
}
