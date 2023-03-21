using AddressBookAPI.Domain.Models;
using AutoMapper;

namespace AddressBookAPI.DTO.ContactProfile
{
    public class ContactProfile: Profile
    {
        public ContactProfile()
        {
            CreateMap<ContactDTO, ContactModel>()
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.Mobile, opt => opt.MapFrom(src => src.Mobile))
            .ForMember(dest => dest.Landline, opt => opt.MapFrom(src => src.Landline))
            .ForMember(dest => dest.Website, opt => opt.MapFrom(src => src.Website))
            .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Address));

            CreateMap<ContactModel, ContactDTO>()
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.Mobile, opt => opt.MapFrom(src => src.Mobile))
            .ForMember(dest => dest.Landline, opt => opt.MapFrom(src => src.Landline))
            .ForMember(dest => dest.Website, opt => opt.MapFrom(src => src.Website))
            .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Address));

            CreateMap<ContactDTO, ContactNoteModel>()
                .ForMember(dest => dest.ContactId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Note, opt => opt.MapFrom(src => src.ContactNote));

            //REVERSE
            CreateMap<ContactNoteModel, ContactDTO>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.ContactId))
                .ForMember(dest => dest.ContactNote, opt => opt.MapFrom(src => src.Note));
        }
    }
}

