using ApiTests.Models;
using FluentAssertions;
using System.Net;

namespace CSharp_NUnit.Tests.petstore.positivePath
{
    public class PetCreateTests_NegativeTests : BaseApiTest
    {
        [Test]
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

        [Test]
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

        [Test]
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
