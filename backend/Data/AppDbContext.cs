using Microsoft.EntityFrameworkCore;
using MonProjetApi.Models;

namespace MonProjetApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Employer> Employers => Set<Employer>();
}
