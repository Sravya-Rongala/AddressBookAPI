using AddressBookAPI.Domain.Models;

namespace AddressBookAPI.Service.Interfaces
{
    public interface IContactServices
    {
        ContactModel GetContactById(int id);
        IEnumerable<ContactModel> GetAllContacts();

        int AddContact(ContactModel contact);
        void UpdateContact(ContactModel contact);
        void DeleteContact(int id);
    }
}
