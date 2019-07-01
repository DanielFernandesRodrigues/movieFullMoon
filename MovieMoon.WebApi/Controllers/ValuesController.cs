using Microsoft.AspNetCore.Mvc;
using MovieMoon.Domain.Contracts;
using MovieMoon.Domain.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace MovieMoon.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly IMovieQueryService service;

        public ValuesController(IMovieQueryService service)
        {
            this.service = service;
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return Ok(new string[] { "value 1", "value 2" });
        }

        // GET api/values/5
        [HttpGet("{page}")]
        public async Task<ActionResult<ResultTMDb<Movie>>> Get(int? page)
        {
            try
            {
                var _page = page.HasValue && page.Value > 0 ? page.Value : 1;
                var result = await service.GetMovies(_page);

                return Ok(await service.GetMovies(_page));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
