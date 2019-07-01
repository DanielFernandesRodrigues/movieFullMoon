using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MovieMoon.DependencyInjection;
using MovieMoon.Domain.Models;
using System;

namespace MovieMoon.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public IContainer ApplicationContainer { get; private set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.Configure<TMDbConfig>(Configuration.GetSection("TMDbConfig"));

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    corsBuilder => corsBuilder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });
            services.Configure<MvcOptions>(options =>
            {
                options.Filters.Add(new CorsAuthorizationFilterFactory("CorsPolicy"));
            });

            // Create the container builder.
            var builder = new ContainerBuilder();
            IoC.Register(builder);
            builder.Populate(services);
            ApplicationContainer = builder.Build();

            // Create the IServiceProvider based on the container.
            return new AutofacServiceProvider(ApplicationContainer);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors("CorsPolicy");
            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
