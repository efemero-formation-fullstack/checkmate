
build: clean test

prepare: clean clean-prepare
    nix develop -c deno cache --vendor --lock=deno.lock src/index.ts src/database/init.ts
    git add -N node_modules/ vendor/ -f


clean:
    @echo clean the dirs
    rm -fr $out
    rm -fr $DENO_DIR
    rm -fr allure-report

clean-prepare:
    git restore -q --staged node_modules/ vendor/ || :

test:
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
    allure --version ; \
    allure generate tests/allure-results -o allure-report ; \
    kill $DENO_PID ; \
    wait $DENO_PID || true ; \
    stopdb

install:
    mkdir -p $out
    mv allure-report $out/public
