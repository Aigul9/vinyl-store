using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Vinyl.Contexts;
using Vinyl.Models;
using System.Collections;
using System.Collections.Specialized;

namespace Vinyl.Repository
{
    public class SongRepository : ISongRepository
    {
        private readonly SongContext _dbContext;

        public SongRepository(SongContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Song> GetSongs()
        {
            return _dbContext.Songs.ToList();
        }

        public Song GetSongByID(int songId)
        {
            return _dbContext.Songs.Find(songId);
        }

        public void InsertSong(Song song)
        {
            _dbContext.Add(song);
            Save();
        }

        public void DeleteSong(Song Song)
        {
            throw new NotImplementedException();
        }

        public void DeleteSong(int songId)
        {
            var song = _dbContext.Songs.Find(songId);
            _dbContext.Songs.Remove(song);
            Save();
        }

        public void UpdateSong(Song song)
        {
            _dbContext.Entry(song).State = EntityState.Modified;
            Save();
        }

        public void Save()
        {
            _dbContext.SaveChanges();
        }
    }
}
