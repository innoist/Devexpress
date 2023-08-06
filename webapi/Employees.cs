namespace webapi
{
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Prefix { get; set; }
        public string Position { get; set; }
        public string BirthDate { get; set; }
        public string HireDate { get; set; }
        public string Notes { get; set; }
        public string Address { get; set; }
        public int StateId { get; set; }

        public Employee()
        {

        }
    }


    public class State
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

}

    
