using ApiTests.Models;
using FluentAssertions;
using System.Net;
using System.Text.Json;

namespace CSharp_XUnit.Tests.petstore.positivePath
{
    public class PetGetTests_PositiveTests : BaseApiTest
    {
        public PetGetTests_PositiveTests(ApiFixture fixture) : base(fixture) { }

        [Fact]
        public async Task GetPetById()
        {
            //Arrange
            var petId = _pets["rex"].Id;
            var petName = _pets["rex"].Name;

            //Act
            var getResponse = await _api.GetPetAsync(petId);
            var fetchedPet = JsonSerializer.Deserialize<Pet>(getResponse.Content!, _serializerOptions);

            //Assert
            getResponse.StatusCode.Should().Be(HttpStatusCode.OK);
            fetchedPet.Should().NotBeNull();
            fetchedPet!.Name.Should().Be(petName);
        }

        [Fact]
        public async Task GetAllPets()
        {
            //Arrange

            //Act
            var getResponse = await _api.GetAllPets();
            var fetchedPets = JsonSerializer.Deserialize<List<Pet>>(getResponse.Content!, _serializerOptions);

            //Assert
            getResponse.StatusCode.Should().Be(HttpStatusCode.OK);
            fetchedPets.Should().NotBeNull();
            fetchedPets.Count.Should().Be(2);


        }

    }
}
