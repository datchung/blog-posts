using Interfaces;
using Ninject.Modules;

namespace Drill
{
    public class DrillModule : NinjectModule
    {
        public override void Load()
        {
            Bind<ITool>().To<Drill>();
        }
    }
}
