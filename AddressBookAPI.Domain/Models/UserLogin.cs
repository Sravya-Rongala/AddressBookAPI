namespace AddressBookAPI.Domain.Models
{
    public class UserLogin
    {
        public string Username { get; set; } = string.Empty;

        public byte[] PassswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }
    }
}
