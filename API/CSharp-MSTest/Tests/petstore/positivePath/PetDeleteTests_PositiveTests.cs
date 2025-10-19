using FluentAssertions;
using System.Net;

namespace CSharp_MSTest.Tests.petstore.positivePath
{
    [TestClass]
    public class PetDeleteTests_PositiveTests : BaseApiTest
    {
        [TestMethod]
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
