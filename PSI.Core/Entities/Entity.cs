using PSI.Core.Interfaces;

namespace PSI.Core.Entities
{
    public abstract class Entity : IEntity
    {
        public int Id { get; set; }
    }
}
