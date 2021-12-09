using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Message
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public string SenderUsername { get; set; }

        public AppUser Sender { get; set; }
        public int RecieverId { get; set; }
        public string RecieverUsername { get; set; }
        public AppUser Reciever { get; set; }
        public string Content { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; }=DateTime.Now;
        public bool SenderDeleted { get; set; }
        public bool RecieverDeleted { get; set; }
    }
}