package formgen

import (
	"encoding/json"
	"errors"
	"strings"
)

func CleanJSON(input string) (interface{}, error) {
	input = strings.TrimSpace(input)

	if strings.HasPrefix(input, "```") {
		lines := strings.SplitN(input, "\n", 2)
		if len(lines) == 2 {
			input = lines[1]
		} else {
			return nil, errors.New("invalid fenced code block")
		}
	}

	input = strings.TrimSuffix(input, "```")
	input = strings.TrimSpace(input)

	var result interface{}
	if err := json.Unmarshal([]byte(input), &result); err != nil {
		return nil, err
	}

	return result, nil
}
