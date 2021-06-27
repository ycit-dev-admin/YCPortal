using PSI.Core.Interfaces.Entities;
using System;

namespace PSI.Core.Entities
{
    public abstract class Entity : IEntity
    {
        public long Id { get; set; }
        public DateTime CreateTime { get; set; }
        public string CreateEmpNo { get; set; }

        public DateTime UpdateTime { get; set; }
        public string UpdateEmpNo { get; set; }
    }
}
