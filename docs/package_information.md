
---
### Bracket utils document pages
* [Unit testing outline](https://github.com/restarian/bracket_utils/blob/master/docs/unit_testing_outline.md)
* [Synopsis](https://github.com/restarian/bracket_utils/blob/master/docs/synopsis.md)
* **Package information**
 
 
**Version**: 0.3.1

**Description**: Miscellaneous methods used in ECMA development.

**Author**: [Robert Steckroth](mailto:RobertSteckroth@gmail.com)[https://restarian.xyz](https://restarian.xyz)

**Development dependencies**: [brace_maybe](https://npmjs.org/package/brace_maybe) [chai](https://npmjs.org/package/chai) [mocha](https://npmjs.org/package/mocha) [requirejs](https://npmjs.org/package/requirejs)

**Optional Dependencies**: [brace_document](https://npmjs.org/package/brace_document) [brace_document_navlink](https://npmjs.org/package/brace_document_navlink)

**Package scripts**:

| Name | Action |
| ---- | ------ |
 | test | ```mocha``` |
 | make_docs | ```brace_document --navlink -i docs -b docs --force-title --title 'Bracket utils document pages' --sort alphanumeric -R``` |
 | make_docs_extra | ```npm run make_docs --silent -- --batten-document-specification --batten-document-mocha --specification-path package_information.md --mocha-path unit_testing_outline.md ``` |

**Keywords**: *helper*