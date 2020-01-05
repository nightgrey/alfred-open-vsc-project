ZIPNAME ?= $(shell basename $$PWD)

clean:
	rm -f ${ZIPNAME}.alfredworkflow

build: clean
	zip -r ${ZIPNAME}.alfredworkflow ./* -x \"./.vscode/*\"

