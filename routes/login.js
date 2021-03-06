'use strict';

var passport = require('passport');
const CONST = require('components/CONST.js');

/**
 * Handler for the /login POST request
 * Authenticates the user using the LocalStrategy
 * Then generates a session
 */
module.exports = function login(req, res, next) {
	passport.authenticate('local', function(err, user,info) {
		if (err) {
			return next(err);
		} else {
			if (!user) {
				return next({
					status: CONST.HTTP_STATUS_CODE.UNAUTHENTICATED,
					error: {
						success: false,
						message:CONST.SIGNALS.AUTH_FAILED
					},
					info:info
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						return next({
							status: CONST.HTTP_STATUS_CODE.UNAUTHENTICATED,
							error:{
								success:false,
								message:CONST.SIGNALS.AUTH_FAILED
							},
							info:info
						});
					} else {
						res.send({success: true, message: CONST.SIGNALS.AUTH_SUCCESS});
					}
				});
			}
		}
	})(req, res, next);
};
