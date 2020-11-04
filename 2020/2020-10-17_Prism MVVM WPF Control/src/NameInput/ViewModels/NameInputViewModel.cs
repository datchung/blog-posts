using Common;
using Prism.Commands;
using Prism.Events;
using Prism.Mvvm;

namespace NameInput.ViewModels
{
    public class NameInputViewModel : BindableBase
    {
        private readonly IEventAggregator _eventAggregator;

        private string _title = "Prism";
        public string Title
        {
            get { return _title; }
            set { SetProperty(ref _title, value); }
        }

        public string Name { get; set; }

        public DelegateCommand SubmitCommand { get; private set; }

        public NameInputViewModel()//IEventAggregator eventAggregator)
        {
            //_eventAggregator = eventAggregator;

            SubmitCommand = new DelegateCommand(OnSubmitted);
        }

        public void OnSubmitted()
        {
            var i = 0;
            //_eventAggregator.GetEvent<NameProvidedEvent>().Publish(_name);
        }
    }
}
