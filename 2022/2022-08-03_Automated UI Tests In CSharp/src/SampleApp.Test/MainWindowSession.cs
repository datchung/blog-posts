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
