using FluentAssertions;
using System.Net;

namespace CSharp_NUnit.Tests.petstore.positivePath
{
    public class PetDeleteTests_NegativeTests : BaseApiTest
    {
        [Test]
        public async Task DeleteNonExistingPet()
        {
            //Arrange
            var petId = "123";

            //Act
            var deleteResponse = await _api.DeletePetAsync(petId);

            //Assert
            deleteResponse.StatusCode.Should().Be(HttpStatusCode.NotFound);
            deleteResponse.StatusDescription.Should().Contain("Not Found");
        }

    }
}
