using AppNetCoreMVC_SchollSystem.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AppNetCoreMVC_SchollSystem {


    public class AppDBContext : IdentityDbContext<AppUser> {
        public AppDBContext(DbContextOptions<AppDBContext> options)
            : base(options) { }

        // Tabulka studentů
        public DbSet<Student> Students {
            get; set;
        }

        // Tabulka předmětů
        public DbSet<Subject> Subjects {
            get; set;
        }
        
        // Tabulka známek
        public DbSet<Grade> Grades {
            get; set;
        }



    }
}
