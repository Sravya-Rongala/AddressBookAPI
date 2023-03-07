using AddressBookAPI.Service.Interfaces;
using AddressBookAPI.Repositories;
using AddressBookAPI.Infrastructure.Data;
using AddressBookAPI.Services;


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

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//EF

/*builder.Services.AddDbContext<ContactDbContext>(options => options.UseSqlServer(
    builder.Configuration.GetConnectionString("default")
    ));
builder.Services.AddScoped<IContactRepository, EFContactRepository>();
builder.Services.AddScoped<ContactServices>();*/

//DAPPER

builder.Services.AddScoped<ContactDetailsContext>();
builder.Services.AddScoped<IContactServices, DapperContactRepository>();
builder.Services.AddScoped<ContactServices>();


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
