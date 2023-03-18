using AddressBookAPI.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using AddressBookAPI.Services;
using Microsoft.AspNetCore.Authorization;


namespace AddressBook.Controllers
{
    /*[Authorize]*/
    [ApiController]
    [Route("contacts")]
    public class ContactController : Controller
    {
        private ContactServices _contactServices;
        public ContactController(ContactServices serviceObj)
        {
            _contactServices = serviceObj;
        }

        [HttpGet]
        public IEnumerable<ContactModel> GetAllContacts()
        {
            return _contactServices.GetAllContacts();
        }

        [HttpGet("{id}")]
        public ContactModel GetContactById(int id)
        {
            return _contactServices.GetContactById(id);
        }

        [HttpPost]
        public int AddContact(ContactModel contact)
        { 
            return _contactServices.AddContactDetails(contact);
        }

        [HttpPut("{id}")]
        public void UpdateContact(int id,ContactModel contact)
        {
            contact.Id= id;
            _contactServices.UpdateContactDetails(contact);
        }

        [HttpDelete("{id}")]
        public void DeleteContact(int id)
        {
            _contactServices.DeleteContact(id);
            
        }

        [HttpGet("searchString")]
        public IEnumerable<ContactModel> GetMatchedContacts(string searchString)
        {
            return _contactServices.GetMatchedContacts(searchString);
        }
    }
}