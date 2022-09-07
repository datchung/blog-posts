using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Appium.Windows;
using System.Threading;

namespace SampleApp.Test
{
    [TestClass]
    public class MainWindowTest
    {
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
            var element = Session.FindElementByName("MainWindow");
            Assert.IsNotNull(element);
        }

        [TestMethod]
        public void NameTextBoxExists()
        {
            var element = Session.FindElementByAccessibilityId("NameTextBox");
            Assert.IsNotNull(element);

        }
        [TestMethod]
        public void SubmitButtonExists()
        {
            var element = Session.FindElementByAccessibilityId("SubmitButton");
            Assert.IsNotNull(element);
        }

        [TestMethod]
        public void ClickSubmitOpensDialog()
        {
            var nameTextBox = Session.FindElementByAccessibilityId("NameTextBox");
            nameTextBox.SendKeys("Homer");

            var submitButton = Session.FindElementByAccessibilityId("SubmitButton");
            submitButton.Click();

            Thread.Sleep(500);
            var messageBox = Session.FindElementByName("A MessageBox");
            Assert.IsNotNull(messageBox);

            var okButton = Session.FindElementByName("OK");
            Assert.IsNotNull(okButton);

            okButton.Click();
            Thread.Sleep(500);

            Assert.ThrowsException<WebDriverException>(() => 
            {
                messageBox = Session.FindElementByName("A MessageBox");
            });
        }
    }
}
