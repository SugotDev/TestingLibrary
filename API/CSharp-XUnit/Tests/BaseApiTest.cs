using ApiTests.Api;
using ApiTests.Models;
using FluentAssertions;
using System.Net;
using System.Text.Json;

namespace CSharp_XUnit.Tests
{
        public class ApiFixture : IAsyncLifetime
        {
            public PetApi Api { get; private set; } = null!;
            public Dictionary<string, Pet> Pets { get; private set; } = null!;
            public JsonSerializerOptions SerializerOptions { get; private set; } = null!;

            public async Task InitializeAsync()
            {
                Api = new PetApi("http://localhost:3001");

                var restoreResponse = await Api.RestoreDatabaseAsync();
                restoreResponse.StatusCode.Should().Be(HttpStatusCode.OK);

                var json = File.ReadAllText("../../../TestData/pets.json");
                SerializerOptions = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };
                Pets = JsonSerializer.Deserialize<Dictionary<string, Pet>>(json, SerializerOptions)!;
            }

            public Task DisposeAsync() => Task.CompletedTask;
        }

        public abstract class BaseApiTest : IClassFixture<ApiFixture>
        {
            protected readonly PetApi _api;
            protected readonly Dictionary<string, Pet> _pets;
            protected readonly JsonSerializerOptions _serializerOptions;

            protected BaseApiTest(ApiFixture fixture)
            {
                _api = fixture.Api;
                _pets = fixture.Pets;
                _serializerOptions = fixture.SerializerOptions;
            }
        }
}