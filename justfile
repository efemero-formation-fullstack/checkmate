
build-test-report: clean test-report

prepare-test-report: clean clean-prepare
    nix develop -c deno cache --vendor --lock=deno.lock src/index.ts src/database/init.ts
    git add -N node_modules/ vendor/ -f

prepare-api: clean clean-prepare
    @echo prepare the cache for the api
    nix develop -c deno compile -A --no-check --lock=deno.lock --output checkmate_api src/index.ts
    rm checkmate_api -f
    git add -N node_modules/ vendor/ .cache -f

prepare-reset-db: clean clean-prepare
    @echo prepare the cache for reset-db
    nix develop -c deno compile -A --no-check --lock=deno.lock --output reset_db src/database/init.ts
    rm reset_db -f
    git add -N node_modules/ vendor/ .cache -f


clean:
    @echo clean the dirs
    rm -fr $out
    rm -fr $DENO_DIR
    rm -fr allure-report
    rm -fr tests/allure-results

clean-prepare:
    git restore -q --staged node_modules/ || :
    git restore -q --staged .cache || :
    git restore -q --staged vendor/ || :

test-report:
    @echo launch the API tests and generate report
    mkdir -p $out ; \
    mkdir -p $DENO_DIR ; \

    initdb ; \
    startdb ; \
    deno run -A src/index.ts --lock-file --vendor --cached-only --node-modules-dir=manual 2>&1 > /dev/null & \
    DENO_PID=$! ; \
    deno run -A src/database/init.ts --lock-file --vendor --cached-only --node-modules-dir=manual ; \
    sleep 1 ; \
    tavern-ci --alluredir=tests/allure-results tests/tavern/*.tavern.yaml || : ; \
    allure generate tests/allure-results -o allure-report ; \
    kill $DENO_PID ; \
    wait $DENO_PID || true ; \
    stopdb
