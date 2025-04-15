package formgen

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCleanJSON(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		expected interface{}
		wantErr  bool
	}{
		{
			name: "valid fenced JSON array",
			input: "```json\n[\n  {\"id\": \"a\", \"type\": \"TEXT\"},\n  {\"id\": \"b\", \"type\": \"NUMBER\"}\n]\n```",
			expected: []interface{}{
				map[string]interface{}{"id": "a", "type": "TEXT"},
				map[string]interface{}{"id": "b", "type": "NUMBER"},
			},
			wantErr: false,
		},
		{
			name:     "valid raw JSON object",
			input:    `{"foo": "bar"}`,
			expected: map[string]interface{}{"foo": "bar"},
			wantErr:  false,
		},
		{
			name: "invalid JSON syntax",
			input: "```json\n{ invalid json }\n```",
			wantErr: true,
		},
		{
			name:    "only triple backticks — error",
			input:   "```",
			wantErr: true,
		},
		{
			name: "json with unknown code block type",
			input: "```yaml\n{\"id\":1}\n```",
			expected: map[string]interface{}{"id": float64(1)},
			wantErr: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			actual, err := CleanJSON(tt.input)
			if tt.wantErr {
				assert.Error(t, err)
			} else {
				assert.NoError(t, err)
				assert.Equal(t, tt.expected, actual)
			}
		})
	}
}
