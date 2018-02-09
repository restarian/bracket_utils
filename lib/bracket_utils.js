
var process = require("child_process")

module.exports = {

	remove_cache: function() {

		// The amdefine module need to be reloaded again so that the previous module data which is stored in the amdefine loader cache will be removed.
		var regex = RegExp(Array.prototype.slice.call(arguments).join("$|")+"$")
		for ( var id in require.cache ) 
			if ( regex.test(id) )
				delete require.cache[id]
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
			if ( error )
				err(error)		
			else
				cb(obj.exitCode, stdout, stderr)
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
	Spawner: function() {

		// This iterator returns an instanced link of the module regardless if the new keyword is used.
		var call_instance
		if ( !(this instanceof (call_instance = module.exports.Spawner) ) )
			return new (Array.prototype.slice.call(arguments).reduce(function(accumulator, value) {
				return accumulator = accumulator.bind(accumulator.prototype, value)
			}, call_instance))()

		this.option = undefined
		// The options object is optional
		if ( typeof arguments[2] === "function" ) {
			arguments[4] = arguments[3]
			arguments[3] = arguments[2]
		} else 
			this.option = arguments[2]

		this.cb = typeof arguments[3] === "function" && arguments[3] || function(){}
		this.err = typeof arguments[4] === "function" && arguments[4] || function(){}
		// If the parameter argument are not an Array than the value will be set as an Array.
		this.parameter = arguments[1] instanceof Array && arguments[1] || [arguments[1]||""]
		this.stdout = this.stderr = ""

		var command = (arguments[0] || this.default_command)

		this.error = function(error) {
			this.err.call(this, error)
		}
		this.standard_out = function(chunk) {
			if ( this.log_stdout )
				console.log(chunk.toString())
			this.stdout += chunk
		}
		this.standard_err = function(chunk) {
			if ( this.log_stderr )
				console.log(chunk.toString())
			this.stderr += chunk
		}
		this.exit = function(code) {
			this.cb.call(this, code)
		}

		try {
			this._spawner = process.spawn(command, this.parameter, this.option)
		} catch(e) {
			if ( this.log_err )
				console.log(e)
			this.err.call(this, e)
			return
		}

		this._spawner.stdout.on("data", this.standard_out.bind(this))
		this._spawner.stderr.on("data", this.standard_err.bind(this))
		this._spawner.on("exit", this.exit.bind(this))
		this._spawner.on("error", this.error.bind(this))

	}
}

