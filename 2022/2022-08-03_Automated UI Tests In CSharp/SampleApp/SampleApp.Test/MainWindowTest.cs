using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium.Appium.Windows;

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
    }
}
