using AddressBookAPI.Domain.Models;
using AddressBookAPI.Infrastructure.Data;
using AddressBookAPI.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AddressBookAPI.Repositories
{
    public class EFContactRepository : IContactServices
    {

        private ContactDbContext _dbo;
        public EFContactRepository(ContactDbContext db)
        {
            _dbo = db;
        }

        public IEnumerable<ContactModel> GetAllContacts()
        {
            IEnumerable<ContactModel> ContactDetailsList = _dbo.ContactDetails;
            return ContactDetailsList;
        }

        public int AddContact(ContactModel contact)
        {
            _dbo.ContactDetails.Add(contact);
            _dbo.SaveChanges();
            return contact.Id;
        }

        public ContactModel GetContactById(int id)
        {
            ContactModel contact = _dbo.ContactDetails.Single(contact => contact.Id == id);
            return contact;
        }

        public void UpdateContact(ContactModel contact)
        {
            _dbo.ContactDetails.Update(contact);
            _dbo.SaveChanges();
        }

        public void DeleteContact(int Id)
        {
            ContactModel contact = this.GetContactById(Id);
            _dbo.ContactDetails.Remove(contact);
            _dbo.SaveChanges();
        }

        public IEnumerable<ContactModel> GetMatchedContacts(string inputString)
        {
            IEnumerable<ContactModel> results = _dbo.ContactDetails.Where(t => t.Name.Contains(inputString) ||
                            t.Email.Contains(inputString) ||
                            t.Mobile.Contains(inputString));
            return results;
        }

    }
}


