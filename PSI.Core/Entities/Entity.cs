using PSI.Core.Interfaces.Entities;
using System;

namespace PSI.Core.Entities
{
    public abstract class Entity : IEntity
    {
        public long ID { get; set; }
        public DateTime CREATE_TIME { get; set; }
        public string CREATE_EMPNO { get; set; }

        public DateTime UPDATE_TIME { get; set; }
        public string UPDATE_EMPNO { get; set; }
    }
}
