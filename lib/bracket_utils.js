/* Bracket Utils resides under the LGPL v3 Copyright (C) 2018 Robert Steckroth [Bustout] <RobertSteckroth@gmail.com>

  Bracket Utils is a collection of API members which aids in ECMA script development.

 Bracket Utils is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 Bracket Utils is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

 Author: Robert Steckroth [Bust0ut] <RobertSteckroth@gmail.com> */

var process = require("child_process")

var utils = {

	cacheManager: function(req) {
	// The cacheManager provides two members of itself. The start member acquires the currently cached modules stored within the provided require method.
	// The dump member will delete any modules which were loaded into the require cache after the start member was called.

		if ( !req || (typeof req !== "function" || typeof req.cache !== "object" ) )
			console.log("The parameter passed into the cacheManager must be the require object passed in by nodejs. Got", req)

		// This iterator returns an instanced link of the module regardless if the new keyword is used.
		var call_instance
		if ( !(this instanceof (call_instance = utils.cacheManager) ) )
			return new (Array.prototype.slice.call(arguments).reduce(function(accumulator, value) {
				return accumulator = accumulator.bind(accumulator.prototype, value)
			}, call_instance))()

		this.req = req
		this.current_state = [] 

		this.start = () => {

			for ( var id in this.req.cache )
				this.current_state.push(id)
		}
		
		this.dump = () => {

			var extra = Object.keys(this.req.cache).filter(value => this.current_state.indexOf(value) === -1)

			extra.forEach(val => {
				delete this.req.cache[val]
			})
			this.current_state = []
		}
	},
	Exec: function() {

		var option = undefined
		// The options object is optional
		if ( typeof arguments[2] === "function" ) {
			arguments[4] = arguments[3]
			arguments[3] = arguments[2]
		} else 
			option = arguments[2]

		var name = arguments[0],
			// If the parameter argument are not an Array than the value will be set as an Array.
			parameter = arguments[1] instanceof Array && arguments[1] || [],
			cb = typeof arguments[3] === "function" && arguments[3] || function(){},
			err = typeof arguments[4] === "function" && arguments[4] || function(){}
		
		// So that the first flag will be spaced to the program name.
		parameter.unshift("")

		var command = name + parameter.join(" ")	

		// The return object is used to get the shell program exit code
		var obj = process.exec(command, option, function(error, stdout, stderr) {

			cb(obj.exitCode, stdout, stderr, error)
		})

	},
	Spawn: function() {

		var option = undefined
		// The options object is optional
		if ( typeof arguments[2] === "function" ) {
			arguments[4] = arguments[3]
			arguments[3] = arguments[2]
		} else 
			option = arguments[2]

		var command = arguments[0],
			// If the parameter argument are not an Array than the value will be set as an Array.
			parameter = arguments[1] instanceof Array && arguments[1] || [],
			cb = typeof arguments[3] === "function" && arguments[3] || function(){},
			err = typeof arguments[4] === "function" && arguments[4] || function(){},
			stdout = stderr = "",
			spawn	

		try {
			spawn = process.spawn(command, parameter, option)
			spawn.stdout.on("data", function(chunk) {
				stdout += chunk
			})
			spawn.stderr.on("data", function(chunk) {
				stderr += chunk
			})
			spawn.on("exit", function(exit_code) {
				cb(exit_code, stdout, stderr)
			})
			spawn.on("error", err)
		} 
		catch(error) {
			err(error)
		}
	},
	projectRoot: function(dir, cb, err) {

		cb = typeof cb === "function" && cb || function(){}
		err_cb = typeof err_cb === "function" && err || function(){}

		var opt = {}
		if ( dir )
			opt.cwd = dir

			this.Exec("git", ["rev-parse", "--show-toplevel"], opt, function(code, stdout, stderr) {

				if ( stderr ) 
					return err_cb(stderr)

				var dir = stdout.trim()
				if ( dir.charAt(0) === "/" )
					dir = dir.replace(/\//g, "\\")

				cb(dir)
				return code
		})
	}
}

module.exports = utils
