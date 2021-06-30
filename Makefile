.PHONY: default, release

default:
	tsc -p .
	firefox index.html

release:
	tsc -p .
	cp *.js *.css *.html release/
	cp -r imgs/ release/
	zip -r release.zip release/
