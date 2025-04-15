package formgen

import (
	"strings"

	"github.com/google/uuid"
	"github.com/sirupsen/logrus"
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

func MapFields(raw interface{}) []Field {
	rawList, ok := raw.([]interface{})
	if !ok {
		return nil
	}

	var result []Field
	for _, item := range rawList {
		obj, ok := item.(map[string]interface{})
		if !ok {
			logrus.Error("array contains non-object item")
			return nil
		}

		if !isOkField(obj) {
			logrus.Error("array contains non-object item")
			return nil
		}

		l := obj["label"].(string)
		t := strings.ToUpper(obj["type"].(string))

		result = append(result, Field{
			ID:    uuid.New().String(),
			Type:  t,
			Label: l,
		})
	}
	return result
}
