using PSI.Core.Interfaces.Entities;

namespace PSI.Core.Entities
{
    public abstract class Entity : IEntity
    {
        public int Id { get; set; }
    }
}
