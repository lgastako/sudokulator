help: ## Display this help text
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

SHOW:=$(shell which bat || echo "cat")
show: ## Show the Makefile
	@$(SHOW) Makefile

aliases: ## Show the aliases
	@sed -n '/^# Aliases/,$$p' Makefile | sed -n '/^[a-zA-Z_-]*: /p'

BUN?=bun
BUNX?=$(BUN)x

build: ## Build the dev build
	$(BUN) run build $(ARGS)

dev:  ## Run the dev server
	$(BUN) --bun run dev $(ARGS)

fmt: ## Run prettier
	$(BUNX) prettier -w ./src $(ARGS)

lint:  ## lint
	$(BUNX) eslint . $(ARGS)

test:  ## Run the tests once
	$(BUN) test $(ARGS)

watch:  ## Run the tests in watch mode
	$(BUN) test --watch $(ARGS)

# Aliases

a: aliases
b: build
d: dev
f: fmt
l: lint
t: test
w: watch
