using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class MessageDto
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public string SenderUsername { get; set; }

        public string SenderPhotoUrl { get; set; }
        public int RecieverId { get; set; }
        public string RecieverUsername { get; set; }
        public string RecieverPhotoUrl { get; set; }
        public string Content { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; }

        [JsonIgnore]

        public bool SenderDeleted { get; set; }

        [JsonIgnore]

        public bool RecieverDeleted { get; set; }
    
    }
}