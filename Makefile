.PHONY: default, release, open

default:
	tsc -p .
	@echo Project compiled. Open index.html in the browser of your choice. Use "make open" to automatically open the game after compilation

open:
	tsc -p .
	firefox index.html

release:
	tsc -p .
	cp *.js *.css *.html release/
	cp -r imgs/ release/
	zip -r release.zip release/
