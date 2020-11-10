help:
	@ echo "Help task is disabled."

parse:
	node -r esm parser/index.js

webpack-dev:
	NODE_ENV=development webpack --mode development

webpack-prod:
	NODE_ENV=production webpack --mode production
