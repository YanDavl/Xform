package formgen

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestQueryLLM(t *testing.T) {

	mockServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		require.Equal(t, "/api/generate", r.URL.Path)

		var reqData map[string]interface{}
		err := json.NewDecoder(r.Body).Decode(&reqData)
		require.NoError(t, err)
		require.Equal(t, "test prompt", reqData["prompt"])

		resp := map[string]string{
			"response": "Mocked response from LLM",
		}
		_ = json.NewEncoder(w).Encode(resp)
	}))
	defer mockServer.Close()

	os.Setenv("OLLAMA_MODEL", "mistral")
	os.Setenv("OLLAMA_URL", mockServer.URL)

	response, err := QueryLLM("test prompt")

	require.NoError(t, err)
	require.Equal(t, "Mocked response from LLM", response)
}