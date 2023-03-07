using AddressBookAPI.Service.Interfaces;
using AddressBookAPI.Domain.Models;

namespace AddressBookAPI.Services
{
    public class ContactServices
    {

        private readonly IContactServices _contactRepository;
        public ContactServices(IContactServices contactRepository)
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

    }
}
