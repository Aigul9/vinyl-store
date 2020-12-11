using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Vinyl.Contexts;
using Vinyl.Models;

namespace Vinyl.Repository
{
    public interface ISongRepository
    {
        IEnumerable<Song> GetSongs();

        Song GetSongByID(int SongId);

        void InsertSong(Song Song);

        void DeleteSong(int SongId);

        void UpdateSong(Song Song);

        void Save();
    }
}
