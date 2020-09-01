[Blog Home Page](../../README.md)

# Create a Web App with ReactJS and .NET Core (Part 1)

_Tags: .NET, Back End, C#, Front End, Full Stack, Javascript_

Table of Contents
1. [Introduction](#introduction)
2. [Create a .NET Core Back End](#create-back)
3. [Create a ReactJS Front End](#create-front)
4. [Host the Front End and Back End on the Same Domain](#host)
5. [WorkFlow: Editing the Back End](#edit-back)
6. [WorkFlow: Editing the Front End](#edit-front)
7. [Conclusion](#conclusion)
8. [Comments](#comments)

## 1. <a name='introduction'></a>Introduction

This will be the first of a multi-part series on how to create a web app with a ReactJS front end and a .NET Core backend. Part one will be about setting up the ReactJS and .NET Core projects and hosting them on the same domain. Part two will be about adding CRUD functionality to the front and back end. Part three will be about security/authentication. The final part will be about deploying the application to Azure.

## 2. <a name='create-back'></a>Create a .NET Core Back End

The back end will be a .NET Core REST API. For this article, I am using Visual Studio 2019 and .NET Core 3.1.

1. Create a new "ASP.NET Core Web Application".
![Cerate New Project](1_CreateNewProject.PNG)
2. Select "Web Application (Model-View-Controller)".
![Cerate New Project 2](1b_CreateNewProject.PNG)
3. After the project is created, add a new controller with the selection "API Controller with read/write actions". Name the controller "NotesController".
4. Remove the following lines in Startup.cs:
```c#
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");
});
```
And replace it with:
```c#
app.UseMvc(routes =>
{
    routes.MapRoute(
        name: "default",
        template: "{controller=Home}/{action=Index}/{id?}");

    routes.MapRoute(
        name: "api",
        template: "api/{controller=Default}/{action=Index}/{id?}");
});
```
5. Add the following in Startup.cs `ConfigureServices` method: 
```c#
services.AddMvc(a => { a.EnableEndpointRouting = false; });
```
6. Run the project (start debugging) and you should see the front end render:
![Debug project front end](6_Debug.PNG)
6. Navigate to /api/notes and you should see the API response to a `GET /api/notes` request:
![Debug project back end](7_Debug.PNG)

## 3. <a name='create-front'></a>Create a ReactJS Front End

The front end will be a ReactJS app bootstrapped from the popular `create-react-app` package. For this article, I am using Windows so commands may need to be modified if you are using a different operating system.

1. Create a new react app using create-react-app. Open a command window and execute
```
npx create-react-app my-app
```

## 4. <a name='host'></a>Host the Front End and Back End on the Same Domain

## 5. <a name='edit-back'></a>WorkFlow: Editing the Back End

## 6. <a name='edit-front'></a>WorkFlow: Editing the Front End

## 7. <a name='conclusion'></a>Conclusion

## 8. <a name='comments'></a>Comments

_Reply to [this tweet]()._