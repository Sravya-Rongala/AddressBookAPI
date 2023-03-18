using AddressBookAPI.Service.Interfaces;
using AddressBookAPI.Domain.Models;
using AddressBookAPI.Infrastructure.Interfaces;

namespace AddressBookAPI.Services
{
    public class ContactServices : IContactServices
    {

        private readonly IContactRepository _contactRepository;
        public ContactServices(IContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }

        public IEnumerable<ContactModel> GetAllContacts()
        {
            return _contactRepository.GetAllContacts();
        }

        public int AddContactDetails(ContactModel contact)
        {
           return _contactRepository.AddContact(contact);
        }

        public ContactModel GetContactById(int id)
        {
            return _contactRepository.GetContactById(id);
        }

        public void UpdateContactDetails(ContactModel contact)
        {
            _contactRepository.UpdateContact(contact);
        }

        public void DeleteContact(int Id)
        {
            _contactRepository.DeleteContact(Id);
        }

        public IEnumerable<ContactModel> GetMatchedContacts(string searchString)
        {
            return _contactRepository.GetMatchedContacts(searchString);
        }
    }
}
