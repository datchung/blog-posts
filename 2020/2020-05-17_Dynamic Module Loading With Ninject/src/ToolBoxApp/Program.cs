using Interfaces;
using Ninject;
using System;

namespace ToolBoxApp
{
    class Program
    {
        static void Main(string[] args)
        {
            var kernel = new StandardKernel();
            kernel.Load("Modules\\*.dll");

            var tool = kernel.Get<ITool>();
            Console.WriteLine(tool.Use());
            
            Console.ReadLine();
        }
    }
}
