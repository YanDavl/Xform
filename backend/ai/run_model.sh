#!/bin/bash

echo "OLLAMA_MODEL is: $OLLAMA_MODEL"
printenv

ollama serve &
sleep 3

if [ -z "$OLLAMA_MODEL" ]; then
  echo "OLLAMA_MODEL is not set! Exiting..."
  exit 1
fi

ollama pull "$OLLAMA_MODEL"

wait
