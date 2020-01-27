/* Bracket Utils resides under the LGPL v3 Copyright (C) 2018 Robert Steckroth [Bustout] <RobertSteckroth@gmail.com>

  Bracket Utils is a collection of API members which aids in ECMA script development.

 Bracket Utils is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 Bracket Utils is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

 Author: Robert Steckroth [Bust0ut] <RobertSteckroth@gmail.com> */

var expect = require("chai").expect,
	path = require("path"),
	utils = require("bracket_utils"),
	maybe = require("brace_maybe")

module.paths.unshift(path.join(__dirname, "..", ".."))
var cache = utils.cacheManager(require)
var it_will = global
global.module = module

describe("Using stop further progression methodology for dependencies in: "+path.basename(__filename), function() { 

	var it = maybe(it_will)	
	it_will.stop = !!process.env.DRY_RUN  
	it_will.quiet = !!process.env.QUIET

	describe("Checking for dependencies..", function() { 

		it("the Bracket Utils module is available", function(done) {
			it_will.stop = true 
			expect((function() {try { require("bracket_utils"); return true; } catch(e) { return e;}})(), "unable to find the bracket_utils module").to.be.true
			it_will.stop = false 
			done()
		})

		it("git is available in the system as a program", function(done) {
			it_will.stop = true 
			require("bracket_utils").Spawn("git", [], {}, function() {
				it_will.stop = false 
				done()
			}, function() {
				expect(false, "git is not available as a system program").to.be.true
				done()
			})
		})

	})

	var err_cb = function(msg) { 
		expect(false, msg).to.be.true
		done()
	}

	describe("git integration functions", function() {

		var utils
		beforeEach(function() {
			cache.start()
			utils = require("bracket_utils")
		})
		afterEach(cache.dump.bind(cache))

		it("finds the correct git root of the current project", function(done) {

			utils.projectRoot(__dirname, function(dir) {
				
				expect(dir).to.be.a("string")
				if ( path.sep === "\\") 
					dir = dir.replace(/\//g, "\\")

				expect(dir).to.equal(path.resolve(__dirname, ".."))
				done()
			}, err_cb)
		})
		it("finds the correct git root of the test repo project", function(done) {

			var test_repo = path.join(__dirname, "test_repo")
			utils.projectRoot(path.join(test_repo, "test_dir"), function(dir) {
				
				expect(dir).to.be.a("string")
				if ( path.sep === "\\") 
					dir = dir.replace(/\//g, "\\")

				expect(dir).to.equal(test_repo)
				done()
			}, err_cb)
		})
	})
})

