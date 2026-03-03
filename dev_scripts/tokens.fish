#! /usr/bin/env fish

mkdir -p .cache/tokens
curl localhost:8080/auth/login -d "login=MrCheckmate&password=SUPER_SECRET_PASSWORD" | jq -r '"Authorization: \(.token_type) \(.access_token)"' >.cache/tokens/auth_admin.header
for i in (seq 6)
    curl localhost:8080/auth/login -d "login=test_player$i&password=test_password" | jq -r '"Authorization: \(.token_type) \(.access_token)"' >.cache/tokens/auth_test_player$i.header
end
