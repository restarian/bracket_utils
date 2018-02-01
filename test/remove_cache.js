/* LGPL v3

  Bracket utils is a collection of ECMA tools to aid in javascript development.

  Copyright (C) 2018 Robert Edward Steckroth <RobertSteckroth@gmail.com>

 this file is a part of Bracket utils 

 Bracket utils is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
 the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

 Bracket utils is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

  Author: Robert Edward Steckroth, Bustout, <RobertSteckroth@gmail.com> */

var chai = require("chai"),
expect = chai.expect,
path = require("path")

module.paths.unshift(path.join(__dirname, "/..", "/.."))

var utils = require("bracket_utils")

describe("the remove_cache method", function() {

	describe("when loading a script path", function() {

		it("with normal usage starts with the loaded module and ends without it in the cahce", function() {

			var mod = require("./example_module/test_module.js")
			expect(mod).to.be.a("object").that.has.key("cool").that.deep.equal({cool: "joes"})
			mod.cool = "not_joes"
			expect(mod).to.be.a("object").that.has.key("cool").that.deep.equal({cool: "not_joes"})

			mod = require("./example_module/test_module.js")
			expect(mod).to.be.a("object").that.has.key("cool").that.deep.equal({cool: "not_joes"})

			utils.remove_cache("test_module.js")

			mod = require("./example_module/test_module.js")
			expect(mod).to.be.a("object").that.has.key("cool").that.deep.equal({cool: "joes"})

		})

		it("using a bind to operate the method starts with the loaded module and ends without it in the cahce", function() {

			var rm_cache = utils.remove_cache.bind(null, "test_module.js")

			var mod = require("./example_module/test_module.js")
			expect(mod).to.be.a("object").that.has.key("cool").that.deep.equal({cool: "joes"})
			mod.cool = "not_joes"
			expect(mod).to.be.a("object").that.has.key("cool").that.deep.equal({cool: "not_joes"})

			mod = require("./example_module/test_module.js")
			expect(mod).to.be.a("object").that.has.key("cool").that.deep.equal({cool: "not_joes"})
	
			rm_cache()

			mod = require("./example_module/test_module.js")
			expect(mod).to.be.a("object").that.has.key("cool").that.deep.equal({cool: "joes"})

			rm_cache = utils.remove_cache.bind(null)

			mod = require("./example_module/test_module.js")
			expect(mod).to.be.a("object").that.has.key("cool").that.deep.equal({cool: "joes"})
			mod.cool = "not_joes"
			expect(mod).to.be.a("object").that.has.key("cool").that.deep.equal({cool: "not_joes"})

			mod = require("./example_module/test_module.js")
			expect(mod).to.be.a("object").that.has.key("cool").that.deep.equal({cool: "not_joes"})
	
			rm_cache("test_module.js")

			mod = require("./example_module/test_module.js")
			expect(mod).to.be.a("object").that.has.key("cool").that.deep.equal({cool: "joes"})

		})
	})

	describe("when loading with a module path", function() {
	
		it("the loaded module and ends without it in the cahce", function() {

			var mod = require("test_module_auto")
			expect(mod).to.be.a("object").that.has.key("cool").that.deep.equal({cool: "man"})
			mod.cool = "not_man"
			expect(mod).to.be.a("object").that.has.key("cool").that.deep.equal({cool: "not_man"})

			mod = require("test_module_auto")
			expect(mod).to.be.a("object").that.has.key("cool").that.deep.equal({cool: "not_man"})

			utils.remove_cache("test_module_auto.js")

			mod = require("test_module_auto")
			expect(mod).to.be.a("object").that.has.key("cool").that.deep.equal({cool: "man"})


		})

		it("using a bind to operate the method the commonjs cache starts the loaded module and ends without it", function() {

			var rm_cache = utils.remove_cache.bind(null, "test_module_auto.js")

			var mod = require("test_module_auto")
			expect(mod).to.be.a("object").that.has.key("cool").that.deep.equal({cool: "man"})
			mod.cool = "not_man"
			expect(mod).to.be.a("object").that.has.key("cool").that.deep.equal({cool: "not_man"})

			mod = require("test_module_auto")
			expect(mod).to.be.a("object").that.has.key("cool").that.deep.equal({cool: "not_man"})
	
			rm_cache()

			mod = require("test_module_auto")
			expect(mod).to.be.a("object").that.has.key("cool").that.deep.equal({cool: "man"})

			rm_cache = utils.remove_cache.bind(null)

			mod = require("test_module_auto")
			expect(mod).to.be.a("object").that.has.key("cool").that.deep.equal({cool: "man"})
			mod.cool = "not_man"
			expect(mod).to.be.a("object").that.has.key("cool").that.deep.equal({cool: "not_man"})

			mod = require("test_module_auto")
			expect(mod).to.be.a("object").that.has.key("cool").that.deep.equal({cool: "not_man"})
	
			rm_cache("test_module_auto.js")

			mod = require("test_module_auto")
			expect(mod).to.be.a("object").that.has.key("cool").that.deep.equal({cool: "man"})

		})
	})


})
