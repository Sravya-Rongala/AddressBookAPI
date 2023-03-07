using AddressBook.Models;
using AddressBook.Data;
using Microsoft.AspNetCore.Mvc;
using AddressBook.Services;

namespace AddressBook.Controllers
{
    [ApiController]
    [Route("controller")]
    public class HomeController : Controller
    {
        private UserOperations _obj;
        public HomeController(UserOperations db)
        {
            _obj = db;
        }
        public IActionResult Index(int id)
        {
            IEnumerable<ContactModel> ContactDetailsList = _obj.GetUsers();
            ViewData["List"] = ContactDetailsList.ToList();
            if (id == 0)
            {
                ContactModel firstItem = ContactDetailsList.FirstOrDefault()!;
                return View(firstItem);
            }
            else
            {
                ContactModel ContactDetails = _obj.GetContactById(id);
                return View(ContactDetails);
            }
        }
    }
}