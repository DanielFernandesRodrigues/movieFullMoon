using Autofac;
using MovieMoon.Domain.Contracts;
using MovieMoon.Infrastructure.Queries;

namespace MovieMoon.DependencyInjection
{
    public class RepositoriesRegistration
    {
        public static void Register(ContainerBuilder builder)
        {
            builder.RegisterType<MovieQuery>().As<IMovieQuery>().InstancePerLifetimeScope();
        }
    }
}
