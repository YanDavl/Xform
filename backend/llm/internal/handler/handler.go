package handler

import (
	"encoding/json"
	"net/http"

	"xform/llm/internal/formgen"
)

type AskRequest struct {
	Prompt string `json:"prompt"`
}

func FormHandler(w http.ResponseWriter, r *http.Request) {
	var req AskRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}
	answer, err := formgen.CreateForm(req.Prompt)

	if err != nil {
		http.Error(w, "LLM error", http.StatusInternalServerError)
		return
	}

	rawFields, err := formgen.CleanRes(answer)
	if err != nil {
		http.Error(w, "Failed to parse LLM response", http.StatusInternalServerError)
		return
	}

	filtered := formgen.MapFields(rawFields)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(filtered)
}
