using AppNetCoreMVC_SchollSystem;
using AppNetCoreMVC_SchollSystem.Models;
using AppNetCoreMVC_SchollSystem.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();


builder.Services.AddDbContext<AppDBContext>(
    options => options.UseSqlServer(
        builder.Configuration.GetConnectionString("SchollDBConnectionAzure")));

builder.Services.AddIdentity<AppUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDBContext>()
    .AddDefaultTokenProviders();

builder.Services.AddScoped<StudentService>();
builder.Services.AddScoped<SubjectService>();
builder.Services.AddScoped<GradeService>();
builder.Services.Configure<IdentityOptions>(options => {
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 8;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
});

builder.Services.ConfigureApplicationCookie(options => {

    options.Cookie.Name = ".AspNetCore.Identity.Application";
    options.ExpireTimeSpan = TimeSpan.FromMinutes(1);
    
    // Po polovinì èasu resetuje pøihlášovací èas.
    options.SlidingExpiration = true;
    options.AccessDeniedPath = "/";

});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment()) {
    app.UseExceptionHandler("/Home/Error");
    
    // Vyhození chyb ...
    app.UseDeveloperExceptionPage();
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// ------------------------------------------------------------------------------
// POZOR NA POØADÍ !!!!!!!!!!!!!!!!!!!!!!!!!!!

// NEJDØÍVE PØIHLÁSIT
app.UseAuthentication();

// PAK ZJISTIT, KAM MÁTE PØÍSTUP !!!!!!!!!!
app.UseAuthorization();

// ------------------------------------------------------------------------------

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
