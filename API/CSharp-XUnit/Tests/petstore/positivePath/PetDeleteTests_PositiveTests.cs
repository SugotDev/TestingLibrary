using FluentAssertions;
using System.Net;

namespace CSharp_XUnit.Tests.petstore.positivePath
{
    public class PetDeleteTests_PositiveTests : BaseApiTest
    {
        public PetDeleteTests_PositiveTests(ApiFixture fixture) : base(fixture) { }

        [Fact]
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
