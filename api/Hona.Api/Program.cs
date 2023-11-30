using Hona.Api.Extensions;
using Hona.Drivers.Configers;

var configer = ConfigerFactory.Default;
var builder = WebApplication.CreateBuilder(args);

builder.AddHona(configer);
builder.Services.AddControllers();

//¹¹½¨
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHona(configer);

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();