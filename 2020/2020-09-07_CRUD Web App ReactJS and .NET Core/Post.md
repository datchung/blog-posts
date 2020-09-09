[Blog Home Page](../../README.md)

# Create a Web App with ReactJS and .NET Core (Part 2)

_Tags: .NET, Back End, C#, Entity Framework, Front End, Full Stack, Javascript, React, REST_

Table of Contents
1. [Introduction](#introduction)
2. [Install Packages](#packages)
3. [Set Up a DbContext](#dbcontext)
4. [Specify a Database Type](#database)
5. [Create a Controller with CRUD Actions](#controller)
6. [Add Seed Data](#seed)
7. [Add API Documentation with Swagger](#doc)
8. [Conclusion](#conclusion)
5. [Comments](#comments)

## 1. <a name='introduction'></a>Introduction

This is a continuation from the previous part, which can be found [here](../2020-08-31_React%20Front%20End%20NET%20Core%20Back%20End/Post.md). In this part, we will set up an Entity Framework `DbContext`, create a class for our model, create a controller with CRUD actions using Entity Framework, and add Swagger API docs. The follow up post will be about adding CRUD functionality to the front end UI.

## 2. <a name='packages'></a>Install Packages

1. Install the following Nuget packages.
   * Microsoft.EntityFrameworkCore, Version=3.1.7
   * Microsoft.EntityFrameworkCore.InMemory, Version=3.1.7
   * Swashbuckle.AspNetCore, Version=5.5.1

## 3. <a name='dbcontext'></a>Set Up a DbContext

1. Create a `Notes` class in the Models folder.

```c#
public class Note
{
    public Guid NoteId { get; set; }
    public DateTime CreatedDate { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
}
```

2. Create a `WebAppContext` class in the Models folder.

```c#
public class WebAppContext : DbContext
{
    public DbSet<Note> Notes { get; set; }

    public WebAppContext(DbContextOptions<WebAppContext> options)
        : base(options)
    {
    }
}
```

## 4. <a name='database'></a>Specify a Database Type

1. Modify `ConfigureServices` in `Startup` as follows

```c#
public void ConfigureServices(IServiceCollection services)
{
    ...

    // Use an Entity Framework in memory database for simplicity
    services.AddDbContext<WebAppContext>(options => options.UseInMemoryDatabase("WebAppContext"));
}
```

## 5. <a name='controller'></a>Create a Controller with CRUD Actions

1. Right click on the Controllers folder > Add > Controller > API Controller with actins, using Entity Framework.
2. Select `Note` for Model class.
3. Select `WebAppContext` for Data context class.
4. Click Add.
   * `NotesController` should be created

## 6. <a name='seed'></a>Add Seed Data

1. Add the following to `WebAppContext`.

```c#
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Note>().HasData(new[] {
        new Note {
            NoteId = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Title = "Note 1",
            Content = "Note 1 content here"
        },
        new Note {
            NoteId = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow.AddDays(-1),
            Title = "Note 2",
            Content = "Note 2 content here"
        }
    });
}
```

2. Add the following to `NotesController`'s default constructor.

```c#
public NotesController(WebAppContext context)
{
    ...

    // Seed data
    _context.Database.EnsureCreated();
}
```

## 7. <a name='doc'></a>Add API Documentation with Swagger

1. Right click on the WebApp project > Properties > Build.

2. Add `;1591` to Suppress warnings.

3. Check the box for XML documentation file.

4. Modify `ConfigureServices` in `Startup` as follows.

```c#
public void ConfigureServices(IServiceCollection services)
{
    ...

    services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo
        {
            Version = "v1",
            Title = "Notes API",
            Description = "A simple example ASP.NET Core Web API",
        });

        // Set the comments path for the Swagger JSON and UI.
        var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
        c.IncludeXmlComments(xmlPath);
    });
}
```

5. Modify `Configure` in `Startup` as follows.

```c#
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    ...

    app.UseSwagger();

    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    });
}
```

6. Add XML comments to `NotesController`.

```c#
/// <summary>
/// GET: api/Notes
/// </summary>
/// <remarks>
/// Remarks here
/// </remarks>
/// <returns></returns>
/// <response code="200">Returns list of notes</response>
[HttpGet]
public async Task<ActionResult<IEnumerable<Note>>> GetNotes()
...
```

7. Run the project (start debugging).

8. Navigate to /swagger. The following Swagger API docs should be shown.

![Swagger](1_swagger.PNG)

## 8. <a name='conclusion'></a>Conclusion

The full example source code can be found [here](src).

## 9. <a name='comments'></a>Comments

_Reply to [this tweet]()._