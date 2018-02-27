/* Bracket utils resides under the LGPL v3

  Bracket utils is a collection of API members which aids in ECMA script development.

  Copyright (C) 2018 Robert Steckroth <RobertSteckroth@gmail.com>

 this file and all files in this directory are a part of Bracket utils 

 Bracket Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
 the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

 Bracket print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

  Author: Robert Steckroth, Bustout, <RobertSteckroth@gmail.com> */

var expect = require("chai").expect,
	path = require("path"),
	maybe = require("brace_maybe")

module.paths.unshift(path.join(__dirname, "..", ".."))
var utils = require("bracket_utils")
var cache = utils.cacheManager(require)

var it_will = global

describe("Using stop further progression methodology for dependencies in: "+path.basename(__filename), function() { 

	var it = maybe(it_will)	
	it_will.stop = !!process.env.DRY_RUN  
	it_will.quiet = !!process.env.QUIET

	describe("Checking for dependencies..", function() { 

		/*
		it("requirejs in the system as a program", function(done) {
			it_will.stop = true 
			expect((function() {try { require("requirejs"); return true; } catch(e) { return e;}})(), "unable to find the requirejs module").to.be.true
			it_will.stop = false 
			done()
		})
		*/

		/*
		it("git is available in the system as a program", function(done) {
			it_will.stop = true 
			utils.Spawn("git", [], function() {
				it_will.stop = false 
				done()
			}, function() {
				expect(false, "git is not available as a system program").to.be.true
				done()
			})
		})
		*/

	})

	describe("using the testing example directory -> " + path.join("test", "example"), function() {

		var utils_path = require.resolve("bracket_utils")

		it("the removeCache member works when one module is required", function(done) {

			cache.start()
			module.require("test_module_auto")	
			expect(require.cache).to.have.any.key(path.join(__dirname, "node_modules", "test_module_auto.js"))
			cache.dump()
			expect(require.cache).to.not.have.any.key(path.join(__dirname, "node_modules", "test_module_auto.js"))
			expect(require.cache).to.have.any.key(utils_path)
			done()
		})

	})
})

