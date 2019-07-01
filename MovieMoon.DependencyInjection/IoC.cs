using Autofac;

namespace MovieMoon.DependencyInjection
{
    public class IoC
    {
        public static void Register(ContainerBuilder builder)
        {
            ServicesRegistration.Register(builder);
            RepositoriesRegistration.Register(builder);
        }
    }
}
