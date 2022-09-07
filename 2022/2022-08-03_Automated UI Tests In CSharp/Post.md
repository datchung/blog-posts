[Blog Home Page](../../README.md)

# Getting Started With Automated UI Testing In C#

_Tags: .NET, C#, UI, Testing, Automated_

Table of Contents
1. [Introduction](#intro)
2. [Create a Sample App to Test](#sample)
2. [Create a Test Project](#project)
3. [Add Nuget Package References](#nuget)
4. [Create a Session Class](#session)
5. [Write Tests](#tests)
6. [Conclusion](#conclusion)
7. [Comments](#comments)

## 1. <a name='intro'></a>Introduction

Writing automated UI tests in C# is possible with the use of a library known as WinAppDriver. Quoted from the [GitHub](https://github.com/microsoft/WinAppDriver) page:

> Windows Application Driver (WinAppDriver) is a service to support Selenium-like UI Test Automation on Windows Applications. This service supports testing Universal Windows Platform (UWP), Windows Forms (WinForms), Windows Presentation Foundation (WPF), and Classic Windows (Win32) apps on Windows 10 PCs.

This article introduces WinApppDriver, how to get started, and how to write basic tests.

## 2. <a name='sample'></a>Create a Sample App to Test

1. Open Visual Studio.
2. Create a new WPF project.
3. Name the project SampleApp and target .NET 6.
3. In MainWindow.xaml, create a label, text box and button.
```xml
<Window x:Class="SampleApp.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:SampleApp"
        mc:Ignorable="d"
        Title="MainWindow" Height="200" Width="600">
    <StackPanel Orientation="Vertical">
        <Label Content="Name"/>
        <TextBox x:Name="NameTextBox"/>
        <Button x:Name="SubmitButton" Content="Submit Name" Click="SubmitButton_Click"/>
    </StackPanel>
</Window>
```
4. In MainWIndow.xaml.cs, add the code-behind for the submit button click.
```csharp
using System.Windows;

namespace SampleApp
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void SubmitButton_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show($"You submitted: {NameTextBox.Text}", "A MessageBox", MessageBoxButton.OK);
        }
    }
}

```

## 3. <a name='install'></a>Install WinAppDriver

1. Go to https://github.com/microsoft/WinAppDriver/releases
2. Download and install the desired version of WinAppDriver. For this guide, 1.2.1 was installed.
3. In Windows, open Developer Settings.
4. Turn on Developer Mode.

## 4. <a name='project'></a>Create a Test Project

1. Add a MSTest Test Project.
2. Name the project SampleApp.Test and target .NET 6.
3. Install the Nuget package `Appium.WebDriver`. At the time of this writing, the latest version is 4.3.2. The project's Nuget packages should look similar to this:
![nuget](nuget.PNG)
4. Add the following Post Build event to the SampleApp project. This copies the output of the SampleApp project to the SampleApp.Test project's output directory. This will simplify the next step.
```
xcopy "$(ProjectDir)bin\$(ConfigurationName)" "$(SolutionDir)SampleApp.Test\$(OutDir)" /y /e
```

## 5. <a name='session'></a>Create a Teset Session

1. Add a new class named `MainWindowSession` to SampleApp.Test.
2. Add the following members to `MainWindowSession`.
```csharp
/// <summary>
/// Path to installed WinAppDriver
/// </summary>
private const string WIN_APP_DRIVER_PATH = @"C:\Program Files (x86)\Windows Application Driver\WinAppDriver.exe";

/// <summary>
/// URL to WinAppDriver "server" that will accept requests.
/// </summary>
private const string WIN_APP_DRIVER_URL = "http://127.0.0.1:4723";

/// <summary>
/// Relative path to the app that is being tested.
/// </summary>
private const string APP_PATH = "netcoreapp3.1\\SampleApp.exe";

/// <summary>
/// How many times to attempt to kill the WinAppDriver process (eg. at the end of a test execution).
/// In my personal experience, only killing the WinAppDriver process once was not reliable enough and
/// the process would still be running.
/// </summary>
private const int KILL_ATTEMPTS = 4;

/// <summary>
/// WinAppDriver process/server
/// </summary>
private static Process WinAppDriverProcess;

/// <summary>
/// WinAppDriver "session" for the app that is being tested.
/// </summary>
public static WindowsDriver<WindowsElement> Session;
```
3. Add a `Setup` method to `MainWindowSession`.
```csharp
public static void Setup(TestContext context)
{
    // Ensure previous runs are properly closed before proceeding
    TearDown();

    WinAppDriverProcess = Process.Start(WIN_APP_DRIVER_PATH);

    // Launch application if it is not yet launched
    if (Session == null)
    {
        var appiumOptions = new AppiumOptions();
        appiumOptions.AddAdditionalCapability("app", APP_PATH);
        appiumOptions.AddAdditionalCapability("deviceName", "WindowsPC");
        Session = new WindowsDriver<WindowsElement>(new Uri(WIN_APP_DRIVER_URL), appiumOptions);
        Assert.IsNotNull(Session);

        Session.Manage().Window.Position = new Point(0, 0);
        Session.Manage().Timeouts().ImplicitWait = TimeSpan.FromMilliseconds(500);
    }
}
```
4. Add a `TearDown` method to `MainWindowSession`.
```csharp
public static void TearDown()
{
    // Close the application and delete the session
    if (Session != null)
    {
        Session.Quit();
        Session = null;
    }

    for (var i = 0; i < KILL_ATTEMPTS; ++i)
    {
        if (WinAppDriverProcess != null && !WinAppDriverProcess.HasExited)
        {
            WinAppDriverProcess.Kill();
        }

        Thread.Sleep(250);
    }
    WinAppDriverProcess = null;
}
```

## 6. <a name='tests'></a>Write Tests

1. Add a new class named `MainWindowTest` to SampleApp.Test.
2. Add the `TestClass` attribute to `MainWindowTest`.
```csharp
[TestClass]
public class MainWindowTest
{
```
3. Add the following member to `MainWindowTest`.
```csharp
/// <summary>
/// Added for convenience.
/// </summary>
private static WindowsDriver<WindowsElement> Session => MainWindowSession.Session;
```
4. Add a `ClassInitialize` method.
```csharp
[ClassInitialize]
public static void ClassInitialize(TestContext context)
{
    // Create session to launch app
    MainWindowSession.Setup(context);
}
```
5. Add a `ClassCleanup` method.
```csharp
[ClassCleanup]
public static void ClassCleanup()
{
    MainWindowSession.TearDown();
}
```
6. Add a method to test that the app window exists.
```csharp
[TestMethod]
public void AppWindowExists()
{
    // Find the app window based on the window's Title
    var element = Session.FindElementByName("MainWindow");
    Assert.IsNotNull(element);
}
```
7. Add a method to test that the Name text box exists in the app window.
```csharp
[TestMethod]
public void NameTextBoxExists()
{
    // Find the Name text box based on x:Name
    var element = Session.FindElementByAccessibilityId("NameTextBox");
    Assert.IsNotNull(element);
}
```
8. Add a method to test that the Submit button exists in the app window.
```csharp
[TestMethod]
public void SubmitButtonExists()
{
    // Find the Submit button based on x:Name
    var element = Session.FindElementByAccessibilityId("SubmitButton");
    Assert.IsNotNull(element);
}
```
9. Add a method to test that inputting a name and clicking the Submit button opens a dialog that contains the inputted name.
```csharp
[TestMethod]
public void ClickSubmitOpensDialog()
{
    var name = "Homer";

    var nameTextBox = Session.FindElementByAccessibilityId("NameTextBox");
    nameTextBox.SendKeys(name);

    var submitButton = Session.FindElementByAccessibilityId("SubmitButton");
    submitButton.Click();

    // Allow time to launch the message box
    Thread.Sleep(500);

    // Get the message box based on window title
    var messageBox = Session.FindElementByName("A MessageBox");
    Assert.IsNotNull(messageBox);

    // Get the label based on text content
    var messageLabel = Session.FindElementByName($"You submitted: {name}");
    Assert.IsNotNull(messageLabel);

    var okButton = Session.FindElementByName("OK");
    Assert.IsNotNull(okButton);

    // Dismiss the message box
    okButton.Click();

    // Allow time to close the message box
    Thread.Sleep(500);

    // The message box should no longer be displayed
    Assert.ThrowsException<WebDriverException>(() => 
    {
        messageBox = Session.FindElementByName("A MessageBox");
    });
}
```

## 7. <a name='conclusion'></a>Conclusion

This course is a practical introduction to GraphQL with real examples. Here are some related topics further research:
* Authentication and authorization
* Subscription performance (eg. how do connections scale, etc)
* HTTP request equivalent of GraphQL queries
* Usage with SPA frameworks (eg. Reactjs)

## 8. <a name='comments'></a>Comments

_Reply to [this tweet](https://twitter.com/innochi_mob/status/)._