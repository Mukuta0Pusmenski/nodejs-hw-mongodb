#!/usr/bin/env bash
export GIT_PS1_SHOWCONFLICTSTATE=''   # блокуємо unbound-variable з вашого PS1
set -euo pipefail

HOST="https://nodejs-hw-mongodb-4-bblx.onrender.com"
EMAIL="test2@example.com"
PASS="Password123"
COOKIES="cookies.txt"

rm -f "$COOKIES"

echo "1) LOGIN"
curl -s -i -c "$COOKIES" \
     -H "Content-Type: application/json" \
     -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\"}" \
     "$HOST/auth/login"

echo -e "\n2) GET empty contacts"
curl -s -i -b "$COOKIES" \
     "$HOST/contacts?page=1&perPage=2&sortBy=name&sortOrder=asc"

echo -e "\n3) CREATE contact"
resp=$(curl -s -b "$COOKIES" \
     -H "Content-Type: application/json" \
     -d '{"name":"Bob","email":"bob@example.com","phone":"000-111","message":"Hi!"}' \
     -X POST "$HOST/contacts")
echo "$resp"
CONTACT_ID=\$(echo "\$resp" | sed -E 's/.*"_id":"([^"]+)".*/\1/')
echo "   → CONTACT_ID=\$CONTACT_ID"

echo -e "\n4) GET all"
curl -s -i -b "$COOKIES" "$HOST/contacts?page=1&perPage=5"

echo -e "\n5) GET by ID"
curl -s -i -b "$COOKIES" "$HOST/contacts/$CONTACT_ID"

echo -e "\n6) PATCH"
curl -s -i -b "$COOKIES" \
     -H "Content-Type: application/json" \
     -d '{"message":"Updated!!!"}' \
     -X PATCH "$HOST/contacts/$CONTACT_ID"

echo -e "\n7) DELETE"
curl -s -i -b "$COOKIES" \
     -X DELETE "$HOST/contacts/$CONTACT_ID"

echo -e "\n8) FINAL GET"
curl -s -i -b "$COOKIES" "$HOST/contacts"

echo -e "\n✅ All tests passed."
