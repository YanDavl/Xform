package formgen

import (
	"encoding/json"
	"strings"
)

func CleanRes(resp string) ([]map[string]interface{}, error) {
	resp = strings.TrimSpace(resp)
	resp = strings.TrimPrefix(resp, "```json")
	resp = strings.TrimPrefix(resp, "```")
	resp = strings.TrimSuffix(resp, "```")
	resp = strings.TrimSpace(resp)

	var parsed []map[string]interface{}
	if err := json.Unmarshal([]byte(resp), &parsed); err != nil {
		return nil, err
	}
	return parsed, nil
}