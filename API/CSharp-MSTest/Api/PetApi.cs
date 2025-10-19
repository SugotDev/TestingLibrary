using RestSharp;
using ApiTests.Models;

namespace ApiTests.Api
{
    public class PetApi
    {
        private readonly RestClient _client;

        public PetApi(string baseUrl)
        {
            _client = new RestClient(baseUrl);
        }
        public async Task<RestResponse> RestoreDatabaseAsync()
        {
            var request = new RestRequest("reset", Method.Post);
            return await _client.ExecuteAsync(request);
        }

        public async Task<RestResponse> CreatePetAsync(Pet pet)
        {
            var request = new RestRequest("pets", Method.Post);
            request.AddJsonBody(pet);
            return await _client.ExecuteAsync(request);
        }

        public async Task<RestResponse> UpdatePetAsync(string id, Pet pet)
        {
            var request = new RestRequest($"pets/{id}", Method.Put);
            request.AddJsonBody(pet);
            return await _client.ExecuteAsync(request);
        }

        public async Task<RestResponse> GetPetAsync(string id)
        {
            var request = new RestRequest($"pets/{id}", Method.Get);
            return await _client.ExecuteAsync(request);
        }

        public async Task<RestResponse> GetAllPets()
        {
            var request = new RestRequest("pets", Method.Get);
            return await _client.ExecuteAsync(request);
        }

        public async Task<RestResponse> DeletePetAsync(string id)
        {
            var request = new RestRequest($"pets/{id}", Method.Delete);
            return await _client.ExecuteAsync(request);
        }
    }
}
