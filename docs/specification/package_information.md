# Bracket Utils
### Package Specifications

----

### 'Bracket
* [Synopsis](https://github.com/restarian/bracket_utils/blob/master/docs/synopsis.md)
* Specification
  * [License information](https://github.com/restarian/bracket_utils/blob/master/docs/specification/license_information.md)
  * **Package information**
  * [Unit test output](https://github.com/restarian/bracket_utils/blob/master/docs/specification/unit_test_output.md)
----

**Version**: 0.3.1

**Description**: Miscellaneous methods used in ECMA development.

**Author**: [Robert Steckroth](mailto:RobertSteckroth@gmail.com)[https://restarian.xyz](https://restarian.xyz)

**Development dependencies**: [brace_maybe](https://npmjs.org/package/brace_maybe) [chai](https://npmjs.org/package/chai) [mocha](https://npmjs.org/package/mocha) [requirejs](https://npmjs.org/package/requirejs)

**Package scripts**:

| Name | Action |
| ---- | ------ |
 | make_docs | ```brace_document --navlink -r -i docs_raw -b docs --force-title --title 'Bracket Utils document pages' --sort depth``` |
 | make_docs_extra | ```npm run make_docs --silent -- --specification --mocha``` |
 | test | ```mocha``` |

**Keywords**: *helper*