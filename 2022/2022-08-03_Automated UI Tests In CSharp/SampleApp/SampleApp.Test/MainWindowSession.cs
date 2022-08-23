using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium.Appium;
using OpenQA.Selenium.Appium.Windows;
using System;
using System.Diagnostics;
using System.Drawing;
using System.Threading;

namespace SampleApp.Test
{
    public class MainWindowSession
    {
        private const string WIN_APP_DRIVER_PATH = @"C:\Program Files (x86)\Windows Application Driver\WinAppDriver.exe";
        private const string WIN_APP_DRIVER_URL = "http://127.0.0.1:4723";
        private const string APP_PATH = "netcoreapp3.1\\SampleApp.exe";
        private const int KILL_ATTEMPTS = 4;

        private static Process WinAppDriverProcess;
        public static WindowsDriver<WindowsElement> Session;

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
    }
}
