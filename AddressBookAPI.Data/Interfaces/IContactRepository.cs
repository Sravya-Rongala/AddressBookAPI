using AddressBookAPI.Domain.Models;

namespace AddressBookAPI.Infrastructure.Interfaces
{
    public interface IContactRepository
    {
        ContactModel GetContactById(int id);
        IEnumerable<ContactModel> GetAllContacts();

        int AddContact(ContactModel contact);
        void UpdateContact(ContactModel contact);
        void DeleteContact(int id);
        IEnumerable<ContactModel> GetMatchedContacts(string searchString);
    }
}
