help:
	@ echo "Help task is disabled."

webpack-dev:
	NODE_ENV=development webpack --mode development

webpack-prod:
	NODE_ENV=production webpack --mode production
