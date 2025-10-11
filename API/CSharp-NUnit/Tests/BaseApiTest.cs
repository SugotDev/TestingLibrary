using ApiTests.Api;
using ApiTests.Models;
using FluentAssertions;
using System.Net;
using System.Text.Json;

namespace CSharp_NUnit.Tests
{
    public abstract class BaseApiTest
    {
        protected PetApi _api;
        protected Dictionary<string, Pet> _pets;
        protected JsonSerializerOptions _serializerOptions;

        [SetUp]
        public async Task Setup()
        {
            _api = new PetApi("http://localhost:3001");

            var restoreResponse = await _api.RestoreDatabaseAsync();
            restoreResponse.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = File.ReadAllText("../../../TestData/pets.json");
            _serializerOptions = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            _pets = JsonSerializer.Deserialize<Dictionary<string, Pet>>(json, _serializerOptions)!;
        }
    }
}