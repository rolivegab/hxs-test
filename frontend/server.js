// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
require('dotenv').config()
const next = require('next')
const express = require('express')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
app
.prepare()
.then(() => {
	express()
	.get('/user/:_id', (req, res) => {
		const {_id} = req.params
		app.render(req, res, '/user', {_id})
	})
	.get('*', (req, res) => {
		handle(req, res)
	})
	.listen(process.env.PORT, (err) => {
		if (err) throw err
		console.log('App listen on port ' + process.env.PORT)
	})
})