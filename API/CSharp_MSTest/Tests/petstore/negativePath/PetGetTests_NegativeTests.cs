using FluentAssertions;
using System.Net;

namespace CSharp_MSTest.Tests.petstore.positivePath
{
    [TestClass]
    public class PetGetTests_NegativeTests : BaseApiTest
    {

        [TestMethod]
        public async Task GetPetByNonExistingId()
        {
            //Arrange
            var petId = "123";

            //Act
            var getResponse = await _api.GetPetAsync(petId);

            //Assert
            getResponse.StatusCode.Should().Be(HttpStatusCode.NotFound);
            getResponse.StatusDescription.Should().Contain("Not Found");
        }
    }
}
