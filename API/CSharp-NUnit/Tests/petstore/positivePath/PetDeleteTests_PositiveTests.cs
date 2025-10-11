using FluentAssertions;
using System.Net;

namespace CSharp_NUnit.Tests.petstore.positivePath
{
    public class PetDeleteTests_PositiveTests : BaseApiTest
    {
        [Test]
        public async Task DeletePet()
        {
            //Arrange
            var pet = _pets["garfield"];

            //Act
            var deleteResponse = await _api.DeletePetAsync(pet.Id);

            //Assert
            deleteResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        }

    }
}
