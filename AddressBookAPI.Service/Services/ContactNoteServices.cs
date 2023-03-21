using AddressBookAPI.Domain.Models;
using AddressBookAPI.Infrastructure.Data;
using AddressBookAPI.Infrastructure.Interfaces;
using AddressBookAPI.Service.Interfaces;

namespace AddressBookAPI.Service.Services
{
    public class ContactNoteServices : IContactNoteServices
    {

        private readonly IContactNoteRepository _contactRepository;
        public ContactNoteServices(IContactNoteRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }
        public void AddContactNote(ContactNoteModel contact)
        {
            _contactRepository.AddContactNote(contact);
        }
       
        public ContactNoteModel GetContactNoteById(int id)
        {
            return _contactRepository.GetContactNoteById(id);
        }

        public void UpdateContactNote(ContactNoteModel contact)
        {
            _contactRepository.UpdateContactNote(contact);
        }

        public void DeleteContactNote(int Id)
        {
            _contactRepository.DeleteContactNote(Id);
        }

        public IEnumerable<ContactNoteModel> GetAllContactNotes() 
        { 
            return _contactRepository.GetAllContactNotes();
        }

        public int GetContactNoteIdByContactId(int contactId)
        {
            return _contactRepository.GetContactNoteIdByContactId(contactId);
        }

    }
}
