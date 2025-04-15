package formgen

import (
	"testing"

	"github.com/google/uuid"
	"github.com/stretchr/testify/require"
)

func TestMapFields_ValidInput(t *testing.T) {
	input := []interface{}{
		map[string]interface{}{
			"type":  "text",
			"label": "Your name",
		},
		map[string]interface{}{
			"type":  "CHECKBOX",
			"label": "Subscribe?",
		},
	}

	fields := MapFields(input)

	require.Len(t, fields, 2)

	for _, f := range fields {
		_, err := uuid.Parse(f.ID)
		require.NoError(t, err)
		require.NotEmpty(t, f.Label)
		require.True(t, f.Type == "TEXT" || f.Type == "CHECKBOX")
	}
}

func TestMapFields_InvalidItemType(t *testing.T) {
	input := []interface{}{
		"not-an-object",
	}

	result := MapFields(input)
	require.Nil(t, result)
}

func TestMapFields_MissingLabel(t *testing.T) {
	input := []interface{}{
		map[string]interface{}{
			"type": "text",
		},
	}

	result := MapFields(input)
	require.Nil(t, result)
}

func TestMapFields_MissingType(t *testing.T) {
	input := []interface{}{
		map[string]interface{}{
			"label": "Some Label",
		},
	}

	result := MapFields(input)
	require.Nil(t, result)
}

func TestMapFields_InvalidType(t *testing.T) {
	input := []interface{}{
		map[string]interface{}{
			"type":  "unknown",
			"label": "Some Label",
		},
	}

	result := MapFields(input)
	require.Nil(t, result)
}

func TestMapFields_WrongInputType(t *testing.T) {
	input := map[string]interface{}{
		"type":  "text",
		"label": "Invalid Root Type",
	}

	result := MapFields(input)
	require.Nil(t, result)
}
