using ApiTests.Models;
using FluentAssertions;
using System.Net;

namespace CSharp_XUnit.Tests.petstore.positivePath
{
    public class PetUpdateTests_NegativeTests : BaseApiTest
    {
        public PetUpdateTests_NegativeTests(ApiFixture fixture) : base(fixture) { }

        [Fact]
        public async Task UpdatePetWithMissingName()
        {
            //Arrange
            var pet = _pets["rex"];
            var petNewName = " ";
            pet.Name = petNewName;

            //Act
            var putResponse = await _api.UpdatePetAsync(pet.Id, pet);

            //Assert
            putResponse.StatusCode.Should().Be(HttpStatusCode.BadRequest);
            putResponse.Content.Should().Contain("Pet name is required");

        }

        [Fact]
        public async Task UpdateEmptyPet()
        {
            //Arrange
            var pet = new Pet();
            var petId = _pets["rex"].Id;

            //Act
            var putResponse = await _api.UpdatePetAsync(petId, pet);

            //Assert
            putResponse.StatusCode.Should().Be(HttpStatusCode.BadRequest);
            putResponse.Content.Should().Contain("Pet id is required");
        }

        [Fact]
        public async Task UpdateNonExistingPet()
        {
            //Arrange
            var petId = "123";
            var pet = new Pet(); pet.Id = petId;

            //Act
            var putResponse = await _api.UpdatePetAsync(pet.Id, pet);

            //Assert
            putResponse.StatusCode.Should().Be(HttpStatusCode.NotFound);
            putResponse.StatusDescription.Should().Contain("Not Found");
        }

    }
}
