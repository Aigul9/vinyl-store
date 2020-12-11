using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Vinyl.Models;
//using System.Data.Entity;

namespace Vinyl.Contexts
{
    public class SongContext : DbContext
    {
        public DbSet<Song> Songs { get; set; }

        public SongContext(DbContextOptions<SongContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
