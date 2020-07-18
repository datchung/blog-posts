using System;

namespace MainApplication
{
    class Program
    {
        private static readonly NLog.Logger Logger = NLog.LogManager.GetCurrentClassLogger();

        static void Main(string[] args)
        {
            // Writes to fileFromMain.txt based on NLog.config
            Logger.Info("Hello from Main");
        }
    }
}
