using AddressBookAPI.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AddressBookAPI.Service.Services;

namespace AddressBook.Controllers
{
   /* [Authorize]*/
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : Controller
    {
        private EmployeeServices _employeeServices;
        public ContactController(EmployeeServices serviceObj)
        {
            _employeeServices = serviceObj;
        }

        [HttpGet("all")]
        public IEnumerable<ContactDTO> GetAllContacts()
        {
            return _employeeServices.GetAllContacts();
        }

        [HttpGet("{id}")]
        public ContactDTO GetContactById(int id)
        {
            return _employeeServices.GetContactById(id);
        }

        [HttpPost]
        public int AddContact(ContactDTO contact)
        {
            return _employeeServices.AddContact(contact);
        }

        [HttpPut("{id}")]
        public void UpdateContact(int id, ContactDTO contactDto)
        {
            contactDto.Id = id;
            _employeeServices.UpdateContact(contactDto);
        }

        [HttpDelete("{id}")]
        public void DeleteContact(int id)
        {
            _employeeServices.DeleteContact(id);
        }

        [HttpGet("searchString")]
        public IEnumerable<ContactModel> GetMatchedContacts(string searchString)
        {
            return _employeeServices.GetMatchedContacts(searchString);
        }

    }
}
