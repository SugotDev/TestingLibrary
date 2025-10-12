using ApiTests.Models;
using FluentAssertions;
using System.Net;

namespace CSharp_XUnit.Tests.petstore.positivePath
{
    public class PetCreateTests_NegativeTests : BaseApiTest
    {
        public PetCreateTests_NegativeTests(ApiFixture fixture) : base(fixture) { }

        [Fact]
        public async Task CreatePetWithMissingName()
        {
            // Arrage
            var pet = _pets["nemo"];
            pet.Name = " ";

            // Act
            var postResponse = await _api.CreatePetAsync(pet);

            // Assert
            postResponse.StatusCode.Should().Be(HttpStatusCode.BadRequest);
            postResponse.Content.Should().Contain("Pet name is required");
        }

        [Fact]
        public async Task CreateEmptyPet()
        {
            //Arrange
            var pet = new Pet();

            //Act
            var postResponse = await _api.CreatePetAsync(pet);

            //Assert
            postResponse.StatusCode.Should().Be(HttpStatusCode.BadRequest);
            postResponse.Content.Should().Contain("Pet id is required");

        }

        [Fact]
        public async Task CreateExistingPet()
        {
            //Arrange
            var pet = _pets["rex"];

            //Act
            var postResponse = await _api.CreatePetAsync(pet);

            //Assert
            postResponse.StatusCode.Should().Be(HttpStatusCode.Conflict);
            postResponse.Content.Should().Contain("already exists");
        }
    }
}
