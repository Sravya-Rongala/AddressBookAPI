using AddressBookAPI.Domain.Models;
using AddressBookAPI.Services;
using AutoMapper;


namespace AddressBookAPI.Service.Services
{
    public class EmployeeServices
    {
        private ContactServices _contactServices;
        private ContactNoteServices _noteServices;
        private readonly IMapper _mapper;

        public EmployeeServices(ContactServices serviceObj, ContactNoteServices noteServices, IMapper mapper)
        {
            _contactServices = serviceObj;
            _noteServices = noteServices;
            _mapper = mapper;
        }

        public IEnumerable<ContactDTO> GetAllContacts()
        {
            var contactList = _contactServices.GetAllContacts();
            var contactDtoList = new List<ContactDTO>();
            foreach (ContactModel contact in contactList) 
            {
                int id = _noteServices.GetContactNoteIdByContactId(contact.Id);
                ContactNoteModel contactNoteModel = _noteServices.GetContactNoteById(id);
                ContactDTO contactDto = _mapper.Map<ContactDTO>(contact);
                contactDto = _mapper.Map(contactNoteModel, contactDto);
                contactDtoList.Add(contactDto);
            }
           return contactDtoList;
        }

        public ContactDTO GetContactById(int id) 
        { 
            ContactModel contact =  _contactServices.GetContactById(id);
            id = _noteServices.GetContactNoteIdByContactId(contact.Id);
            ContactNoteModel contactNoteModel = _noteServices.GetContactNoteById(id);
            ContactDTO contactDto = _mapper.Map<ContactDTO>(contact);
            contactDto = _mapper.Map(contactNoteModel,contactDto);
            return contactDto;
        }

        public int AddContact(ContactDTO contactDto)
        {
            ContactModel contact = _mapper.Map<ContactModel>(contactDto);
            contactDto.Id = _contactServices.AddContactDetails(contact);
            ContactNoteModel contactNote = _mapper.Map<ContactNoteModel>(contactDto);
            _noteServices.AddContactNote(contactNote);
            return contactDto.Id;
        }

        public void UpdateContact(ContactDTO contactDto) 
        {
            ContactModel contact = _mapper.Map<ContactModel>(contactDto);
            _contactServices.UpdateContactDetails(contact);
            ContactNoteModel contactNoteModel = _mapper.Map<ContactNoteModel>(contactDto);
            _noteServices.UpdateContactNote(contactNoteModel);
        }

        public void DeleteContact(int id) 
        {
            int noteId = _noteServices.GetContactNoteIdByContactId(id);
            _noteServices.DeleteContactNote(noteId);
            _contactServices.DeleteContact(id);
            
        }

        public IEnumerable<ContactModel> GetMatchedContacts(string searchString)
        {
            return _contactServices.GetMatchedContacts(searchString);
        }

    }
}
