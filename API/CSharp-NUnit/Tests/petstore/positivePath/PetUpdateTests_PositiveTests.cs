using ApiTests.Models;
using FluentAssertions;
using System.Net;
using System.Text.Json;

namespace CSharp_NUnit.Tests.petstore.positivePath
{
    public class PetUpdateTests_PositiveTests : BaseApiTest
    {
        [Test]
        public async Task UpdatePet()
        {
            //Arrange
            var pet = _pets["rex"];
            var petNewName = "Max";
            pet.Name = petNewName;

            //Act
            var putResponse = await _api.UpdatePetAsync(pet.Id, pet);
            var updatedPet = JsonSerializer.Deserialize<Pet>(putResponse.Content!, _serializerOptions);

            //Assert
            putResponse.StatusCode.Should().Be(HttpStatusCode.OK);
            updatedPet.Should().NotBeNull();
            updatedPet!.Name.Should().Be(petNewName);

        }

    }
}
