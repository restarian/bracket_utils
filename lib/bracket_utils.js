
var process = require("child_process")

module.exports = {

	remove_cache: function() {

		// The amdefine module need to be reloaded again so that the previous module data which is stored in the amdefine loader cache will be removed.
		var regex = RegExp(Array.prototype.slice.call(arguments).join("$|")+"$")
		for ( var id in require.cache ) 
			if ( regex.test(id) )
				delete require.cache[id]
	},
	Spinner: function() {

		this.cb = typeof arguments[3] === "function" && arguments[3] || function(){}
		this.err = typeof arguments[4] === "function" && arguments[4] || function(){}
		// If the parameter argument are not an Array than the value will be set as an Array.
		this.parameter = arguments[1] instanceof Array && arguments[1] || [arguments[1]||""]
		this.option = arguments[2]
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
			this._spinner = process.spawn(command, this.parameter, this.option)
		} catch(e) {
			if ( this.log_err )
				console.log(e)
			this.err.call(this, e)
			return
		}

		this._spinner.stdout.on("data", this.standard_out.bind(this))
		this._spinner.stderr.on("data", this.standard_err.bind(this))
		this._spinner.on("exit", this.exit.bind(this))
		this._spinner.on("error", this.error.bind(this))

	}
}

