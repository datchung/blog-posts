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

1. Open Visual Studio
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

## 5. <a name='session'></a>Create a Session Class


## 6. <a name='tests'></a>Write Tests


## 7. <a name='conclusion'></a>Conclusion

This course is a practical introduction to GraphQL with real examples. Here are some related topics further research:
* Authentication and authorization
* Subscription performance (eg. how do connections scale, etc)
* HTTP request equivalent of GraphQL queries
* Usage with SPA frameworks (eg. Reactjs)

## 8. <a name='comments'></a>Comments

_Reply to [this tweet](https://twitter.com/innochi_mob/status/)._