/*using AddressBookAPI.Domain.Models;
using AddressBookAPI.Service.Services;
using AddressBookAPI.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace AddressBookAPI.Controllers
{
    public class ContactDTOController
    {
    }
}


using AddressBookAPI.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using AddressBookAPI.Services;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using AddressBookAPI.Service.Services;

namespace AddressBook.Controllers
{
    *//*[Authorize]*//*
    [ApiController]
    [Route("contacts")]
    public class ContactController : Controller
    {
        private ContactServices _contactServices;
        private ContactNoteServices _noteServices;
        private readonly IMapper _mapper;

        public ContactController(ContactServices serviceObj, ContactNoteServices noteServices, IMapper mapper)
        {
            _contactServices = serviceObj;
            _noteServices = noteServices;
            _mapper = mapper;
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
        public int AddContact(ContactDTO contactDto)
        {
            ContactModel contact = _mapper.Map<ContactModel>(contactDto);
            contactDto.Id = _contactServices.AddContactDetails(contact);
            ContactNoteModel contactNotes = _mapper.Map<ContactNoteModel>(contactDto);
            _noteServices.AddContactNote(contactNotes);
            return contactDto.Id;
        }

        [HttpPut("{id}")]
        public void UpdateContact(int id, ContactDTO contactDto)
        {
            contactDto.Id = id;
            ContactModel contact = _mapper.Map<ContactModel>(contactDto);
            _contactServices.UpdateContactDetails(contact);
        }

        [HttpDelete("{id}")]
        public void DeleteContact(int id)
        {
            _contactServices.DeleteContact(id);

        }

        [HttpGet("inputString")]
        public IEnumerable<ContactModel> GetMatchedContacts(string inputString)
        {
            return _contactServices.GetMatchedContacts(inputString);
        }
    }
}*/