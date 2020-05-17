using Interfaces;
using System;

namespace Drill
{
    public class Drill : ITool
    {
        public string Use()
        {
            return "Whir";
        }
    }
}
