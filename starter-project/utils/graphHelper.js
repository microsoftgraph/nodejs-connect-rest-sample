/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

const request = require('superagent');

/**
 * Generates a GET request the user endpoint.
 * @param {string} accessToken The access token to send with the request.
 * @param {callback} callback
 */
		function getUserData(accessToken, callback) {

		}

/**
 * Generates a GET request for the user's profile photo.
 * @param {string} accessToken The access token to send with the request.
 * @param {callback} callback
//  */
		function getProfilePhoto(accessToken, callback) {

		}

/**
 * Generates a PUT request to upload a file.
 * @param {string} accessToken The access token to send with the request.
 * @param {callback} callback
//  */
		function uploadFile(accessToken, file, callback) {

		}

/**
 * Generates a POST request to create a sharing link (if one doesn't already exist).
 * @param {string} accessToken The access token to send with the request.
 * @param {string} id The ID of the file to get or create a sharing link for.
 * @param {callback} callback
//  */
// See https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/item_createlink
		function getSharingLink(accessToken, id, callback) {

		}

/**
 * Generates a POST request to the SendMail endpoint.
 * @param {string} accessToken The access token to send with the request.
 * @param {string} data The data which will be 'POST'ed.
 * @param {callback} callback
 * Per issue #53 for BadRequest when message uses utf-8 characters:
 * `.set('Content-Length': Buffer.byteLength(mailBody,'utf8'))`
 */
		function postSendMail(accessToken, message, callback) {

		}

exports.getUserData = getUserData;
exports.getProfilePhoto = getProfilePhoto;
exports.uploadFile = uploadFile;
exports.getSharingLink = getSharingLink;
exports.postSendMail = postSendMail;