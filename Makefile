help: ## Display this help text
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

SHOW:=$(shell which bat || echo "cat")
show: ## Show the Makefile
	@$(SHOW) Makefile

aliases: ## Show the aliases
	@sed -n '/^# Aliases/,$$p' Makefile | sed -n '/^[a-zA-Z_-]*: /p'

BUN?=bun
BUNX?=$(BUN)x

build: ## Build the dev buid
	$(BUND) build $(ARGS)

dev:  ## Run the dev server
	$(BUN) --bun run dev

fmt: ## Run cargo fmt with $(ARGS)
	$(BUNX) prettier -w ./src

lint:  ## lint
	$(BUNX) eslint .

test:  ## Run cargo test
	$(BUN) test

# Aliases

a: aliases
b: build
f: fmt
l: lint
t: test
