using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Vinyl.Models
{
    public class Song
    {
        [Key]
        public int vId { get; set; }
        public string vArtist { get; set; }
        public string vAlbum { get; set; }
        public string vBarcode { get; set; }
        public string vCatalogNo { get; set; }
        public string vLastReleaseYear { get; set; }
        public string vReleaseYear { get; set; }
        public string vFormat { get; set; }
        public string vLabel { get; set; }
        public string vCountry { get; set; }
        public string vTop { get; set; }
        public string vState { get; set; }
        public string vMusicalStyle { get; set; }
        public string vMarks { get; set; }
        public int vPrice { get; set; }
    }
}
