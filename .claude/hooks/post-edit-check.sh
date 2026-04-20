#!/bin/bash

input=$(cat)
file_path=$(echo "$input" | jq -r '.tool_input.file_path // empty' 2>/dev/null)

if [ -z "$file_path" ] || ! echo "$file_path" | grep -qE '\.(ts|tsx)$'; then
  exit 0
fi

echo ""
echo "[post-edit-check] $file_path"
echo ""

npx tsc --noEmit 2>&1
tsc_exit=$?

npx jest --findRelatedTests "$file_path" --passWithNoTests 2>&1
jest_exit=$?

[ $tsc_exit -eq 0 ] && [ $jest_exit -eq 0 ] && exit 0 || exit 1
