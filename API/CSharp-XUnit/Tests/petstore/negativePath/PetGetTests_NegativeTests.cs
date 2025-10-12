using FluentAssertions;
using System.Net;

namespace CSharp_XUnit.Tests.petstore.positivePath
{
    public class PetGetTests_NegativeTests : BaseApiTest
    {
        public PetGetTests_NegativeTests(ApiFixture fixture) : base(fixture) { }

        [Fact]
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
