using AddressBookAPI.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AddressBookAPI.Service.Services;

namespace AddressBook.Controllers
{
    /*[Authorize]*/
    [ApiController]
    [Route("contactNote")]
    public class ContactNoteController : Controller
    {
        private ContactNoteServices _contactNoteServices;

        public ContactNoteController(ContactNoteServices serviceObj)
        {
            _contactNoteServices = serviceObj;
        }

        [HttpGet("{id}")]
        public ContactNoteModel GetContactNoteById(int id)
        {
            return _contactNoteServices.GetContactNoteById(id);
        }

        [HttpPost]
        public void AddContactNote(ContactNoteModel contact)
        {
            _contactNoteServices.AddContactNote(contact);
        }

        [HttpPut("{id}")]
        public void UpdateContact(int id, ContactNoteModel contact)
        {
            contact.ContactId = id;
            _contactNoteServices.UpdateContactNote(contact);
        }

        [HttpDelete("{id}")]
        public void DeleteContactNote(int id)
        {
            _contactNoteServices.DeleteContactNote(id);

        }
    }
}