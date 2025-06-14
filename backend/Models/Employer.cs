namespace MonProjetApi.Models
{
    public class Employer
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public decimal Salary { get; set; }
        public string HireDate { get; set; }
    }
}

