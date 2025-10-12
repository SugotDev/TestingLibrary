using ApiTests.Models;
using FluentAssertions;
using System.Net;
using System.Text.Json;

namespace CSharp_XUnit.Tests.petstore.positivePath
{
    public class PetCreateTests_PositiveTests : BaseApiTest
    {
        public PetCreateTests_PositiveTests(ApiFixture fixture) : base(fixture) { }

        [Fact]
        public async Task CreatePet()
        {
            // Arrage
            var pet = _pets["nemo"];

            // Act
            var postResponse = await _api.CreatePetAsync(pet);
            var createdPet = JsonSerializer.Deserialize<Pet>(postResponse.Content!, _serializerOptions);

            // Assert
            postResponse.StatusCode.Should().Be(HttpStatusCode.Created);
            createdPet.Should().NotBeNull();
            createdPet!.Id.Should().Be(pet.Id);
        }
    }
}
