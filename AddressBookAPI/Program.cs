using AddressBookAPI.Service.Interfaces;
using AddressBookAPI.Repositories;
using AddressBookAPI.Infrastructure.Data;
using AddressBookAPI.Services;
using Microsoft.EntityFrameworkCore;
using SimpleInjector;
using SimpleInjector.Lifestyles;

//To solve Cors Error

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins,
                          builder =>
                          {
                              builder.WithOrigins("http://127.0.0.1:5500")
                                                  .AllowAnyHeader()
                                                  .AllowAnyMethod();
                          });
});

builder.Services.AddControllers();

//Simple Injector

var container = new Container();
container.Options.DefaultLifestyle = Lifestyle.Scoped;
container.Options.DefaultScopedLifestyle = new AsyncScopedLifestyle();

builder.Services.AddSimpleInjector(container, options =>
{
    options.AddAspNetCore().AddControllerActivation();
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//EF 
/*
builder.Services.AddDbContext<ContactDbContext>(options => options.UseSqlServer(
    builder.Configuration.GetConnectionString("default")
    ));
container.Register<IContactServices, EFContactRepository>();
container.Register<ContactServices>();*/

//DAPPER

container.Register<ContactDetailsContext>();
container.Register<IContactServices, DapperContactRepository>();
container.Register<ContactServices>();


//EF

/*builder.Services.AddDbContext<ContactDbContext>(options => options.UseSqlServer(
    builder.Configuration.GetConnectionString("default")
    ));
builder.Services.AddScoped<IContactServices, EFContactRepository>();
builder.Services.AddScoped<ContactServices>();*/

//DAPPER
/*
builder.Services.AddScoped<ContactDetailsContext>();
builder.Services.AddScoped<IContactServices, DapperContactRepository>();
builder.Services.AddScoped<ContactServices>();*/


var app = builder.Build();

//To solve Cors Error

app.UseCors(MyAllowSpecificOrigins);

// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
