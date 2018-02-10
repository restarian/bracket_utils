
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
}

