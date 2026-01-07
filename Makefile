help: ## Display this help text
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

SHOW:=$(shell which bat || echo "cat")
show: ## Show the Makefile
	@$(SHOW) Makefile

aliases: ## Show the aliases
	@sed -n '/^# Aliases/,$$p' Makefile | sed -n '/^[a-zA-Z_-]*: /p'

BUN?=bun

build: ## Build the dev buid
	$(BUND) build $(ARGS)

dev:  ## Run the dev server
	$(BUN) --bun run dev

# check: ## Run cargo check
# 	$(CARGO) check $(ARGS)

# fmt: ## Run cargo fmt with $(ARGS)
# 	$(CARGO) fmt

# full-release: fmt check lint release # full release built with fmt/check/lint

# lint:  ## lint
# 	$(CARGO) clippy

# release: ## Build the release build
# 	$(CARGO) build --release $(ARGS)

# run:  ## Run the dev build with $(ARGS)
# 	$(CARGO) run -- $(ARGS)

# test:  ## Run cargo test
# 	$(CARGO) test

# Aliases

a: aliases
b: build
c: check
f: fmt
fr: full-release
l: lint
r: run
re: release
t: test
wt: watch-types
