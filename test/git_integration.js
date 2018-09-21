/* Bracket utils resides under the LGPL v3

  Bracket utils is a collection of API members which aids in ECMA script development.

  Copyright (C) 2018 Robert Steckroth <RobertSteckroth@gmail.com>

 This file and all files in/under this directory are a part of Bracket utils unless otherwise stated.

 Bracket Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
 the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

 Bracket print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

  Author: Robert Steckroth [Bust0ut] <RobertSteckroth@gmail.com> */

var expect = require("chai").expect,
	path = require("path"),
	maybe = require("brace_maybe"),
	print = require("bracket_print")

module.paths.unshift(path.join(__dirname, "..", ".."))

var up = print({level: 1})
var up_err = up.spawn({level: 2})

var it_will = global

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

	describe("git integration functions", function() {

		var utils
		beforeEach(function() {
			utils = require("bracket_utils")
		})
		afterEach(function() {

			for ( var id in require.cache )
				if ( /[\\,\/]bracket_utils.js/.test(id.substr(-17)) )
					delete require.cache[id]
		})

		it("finds the correct git root repository", function(done) {

			utils.projectRoot(__dirname, function(dir) {
				
				expect(dir).to.be.a("string")
				expect(dir.replace(/\//g, "\\")).to.equal(path.resolve(__dirname, ".."))
				done()
			}, function(err) {

				expect(up_err.log_false(err)).to.be.true
				done()
			})
		})

	})
})

