using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Appium.Windows;
using System.Threading;

namespace SampleApp.Test
{
    [TestClass]
    public class MainWindowTest
    {
        /// <summary>
        /// Added for convenience.
        /// </summary>
        private static WindowsDriver<WindowsElement> Session => MainWindowSession.Session;

        [ClassInitialize]
        public static void ClassInitialize(TestContext context)
        {
            // Create session to launch app
            MainWindowSession.Setup(context);
        }

        [ClassCleanup]
        public static void ClassCleanup()
        {
            MainWindowSession.TearDown();
        }

        [TestMethod]
        public void AppWindowExists()
        {
            // Find the app window based on the window's Title
            var element = Session.FindElementByName("MainWindow");
            Assert.IsNotNull(element);
        }

        [TestMethod]
        public void NameTextBoxExists()
        {
            // Find the Name text box based on x:Name
            var element = Session.FindElementByAccessibilityId("NameTextBox");
            Assert.IsNotNull(element);
        }

        [TestMethod]
        public void SubmitButtonExists()
        {
            // Find the Submit button based on x:Name
            var element = Session.FindElementByAccessibilityId("SubmitButton");
            Assert.IsNotNull(element);
        }

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
    }
}
