.PHONY: default, release

default:
	tsc -p .
	firefox index.html

release:
	tsc -p .
	cp *.js *.css *.html release/
	zip -r release.zip release/
