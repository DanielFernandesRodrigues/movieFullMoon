using Autofac;
using MovieMoon.Domain.Contracts;
using MovieMoon.Service.Queries;

namespace MovieMoon.DependencyInjection
{
    public class ServicesRegistration
    {
        public static void Register(ContainerBuilder builder)
        {
            builder.RegisterType<MovieQueryService>().As<IMovieQueryService>().InstancePerLifetimeScope();
        }
    }
}
