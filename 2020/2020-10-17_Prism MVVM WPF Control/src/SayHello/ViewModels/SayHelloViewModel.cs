using Common;
using Prism.Events;
using Prism.Mvvm;

namespace SayHello.ViewModels
{
    public class SayHelloViewModel : BindableBase
    {
        private readonly IEventAggregator _eventAggregator;
        public string Name { get; set; }

        public SayHelloViewModel()//IEventAggregator eventAggregator)
        {
            //_eventAggregator = eventAggregator;

            //_eventAggregator.GetEvent<NameProvidedEvent>().Subscribe(s => Name = s);
        }
    }
}
