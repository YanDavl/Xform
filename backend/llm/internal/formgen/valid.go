package formgen

import (
	"strings"

	"github.com/google/uuid"
)

var allowedTypes = map[string]bool{
	"TEXT":    true,
	"NUMBER":  true,
	"CHECKBOX": true,
}

type Field struct {
	ID    string `json:"id"`
	Type  string `json:"type"`
	Label string `json:"label"`
}

func isOkField(f map[string]interface{}) bool {
	typ, ok := f["type"].(string)
	if !ok || !allowedTypes[strings.ToUpper(typ)] {
		return false
	}
	_, labelOk := f["label"].(string)
	return labelOk
}

func MapFields(raw []map[string]interface{}) []Field {
	var result []Field
	for _, f := range raw {
		if !isOkField(f) {
			continue
		}

		l := f["label"].(string)
		t := strings.ToUpper(f["type"].(string))

		result = append(result, Field{
			ID:    uuid.New().String(),
			Type:  t,
			Label: l,
		})
	}
	return result
}