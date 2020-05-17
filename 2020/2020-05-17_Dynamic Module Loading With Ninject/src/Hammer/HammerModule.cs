using Interfaces;
using Ninject.Modules;

namespace Hammer
{
    public class HammerModule : NinjectModule
    {
        public override void Load()
        {
            Bind<ITool>().To<Hammer>();
        }
    }
}
