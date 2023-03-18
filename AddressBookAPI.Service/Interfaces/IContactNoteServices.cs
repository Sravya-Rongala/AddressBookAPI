using AddressBookAPI.Domain.Models;

namespace AddressBookAPI.Service.Interfaces
{
    public interface IContactNoteServices
    {
        ContactNoteModel GetContactNoteById(int id);
        void AddContactNote(ContactNoteModel contact);
        void UpdateContactNote(ContactNoteModel contact);
        void DeleteContactNote(int id);

    }
}
