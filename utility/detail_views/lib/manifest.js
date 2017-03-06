'use strict';
const DICTIONARY = require('./dictionary');
const capitalize = require('capitalize');
const pluralize = require('pluralize');

var generateTableElement = function (label, data) {
	if (data.length > 1) {
		data = data.reduce((result, val, index) => {
			result[0] = result[0] || {};
			if (val && typeof val === 'object') return [Object.assign(result[0], val)];
			else result[0][index] = val;
		}, []);
	}
	let elem = data[0];
	if (Array.isArray(elem)) return generateTableElement(label, elem);
	else {
		elem = (elem && elem.type && DICTIONARY[Symbol.for(elem.type)]) ? elem.type : elem;
		if (DICTIONARY[Symbol.for(elem)]) return [{ label: 'values' }];
		else return Object.keys(elem).reduce((result, key) => {
			result.push({ label: key });
			return result;
		}, []);
	}
};

var handleTable = function (label, data) {
	return {
		component: 'ResponsiveCard',
		props: {
			cardTitle: pluralize(label)
		},
		children: [{
			component: 'ResponsiveTable',
			props: {
				headers: generateTableElement(label, data)
			}
		}]
	};
};

var buildInputComponent = function (label, type) {
	return {
		type: (['text', 'boolean', 'id'].indexOf(type) !== -1) ? 'text' : type,
		label: capitalize.words(label.replace(/_/g, ' ')),
		name: label.replace(/\s/g, '.'),
		layoutProps: {
			horizontalform: true
		}
	};
};

var handleFormElements = function (label, value) {
	value = (value && value.type && DICTIONARY[Symbol.for(value.type)]) ? value.type : value;
	let type = DICTIONARY[Symbol.for(value)];
	if (type && type !== 'array' && !Array.isArray(value)) return buildInputComponent(label, type);
	else if (value && typeof value === 'object' && !Array.isArray(value)) return buildFormGroup(label, value); 
	else if (Array.isArray(value)) return handleTable(label, value);
};

var buildFormGroup = function (label, data, isRoot = false) {
	return {
		card: {
			twoColumns: isRoot,
			props: {
				cardTitle: `${ capitalize.words(label) }`
			},
		},
		formElements: (isRoot) ? Object.keys(data).reduce((result, key, index) => {
			result[0] = result[0] || {
				formGroupElementsLeft: [],
				formGroupElementsRight: []
			};
			let elem = handleFormElements(`${ label } ${ key }`, data[key]);
			result[0][(index % 2 === 0) ? 'formGroupElementsLeft' : 'formGroupElementsRight'].push(elem);
			return result;
		}, []) : Object.keys(data).reduce((result, key) => {
			let elem = handleFormElements(`${ label } ${ key }`, data[key]);
			result.push(elem);
			return result;
		}, [])
	};
};

var buildChildren = function (schema, label, options = {}) {
	let top = {
		component: 'ResponsiveForm',
		props: {
			marginBottom: 30,
			footergroups: [],
			formgroups: [{
				card: {
					twoColumns: true,
					props: {
						cardTitle: `${ capitalize(label) } Details`
					}
				},
				formElements: [{
					formGroupElementsLeft: [],
					formGroupElementsRight: []	
				}]
			}]
		}
	};
	let formElements = top.props.formgroups[0].formElements;
	let result = [top];
	let index = 0;
	for (let key in schema) {
		let data = (schema[key] && schema[key].type && DICTIONARY[Symbol.for(schema[key].type)]) ? schema[key].type : schema[key];
		let type = DICTIONARY[Symbol.for(data)];
		if (type && type !== 'array' && !Array.isArray(data)) formElements[0][(index++ % 2 === 0) ? 'formGroupElementsLeft' : 'formGroupElementsRight'].push(buildInputComponent(key, type));
		else if (data && typeof data === 'object' && !Array.isArray(data)) top.props.formgroups.push(buildFormGroup(key, data, true));
		else if (Array.isArray(data)) result.push(handleTable(key, data));
	}
	return result;
};

var construct = function (schema, label, options = {}) {
	return {
		resources:{},
		onFinish:'render',
		pageData:{
			title:capitalize(label),
			navLabel:capitalize(label),
		},
		layout: {
			component: 'Container',
			props: {},
			children: [{
				component: 'Title',
				props: {
					style: {
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: 30
          }
				},
				children: capitalize(label)
			}]
				.concat(buildChildren(schema, label, options))
		}
	};
};

module.exports = function buildManifest (schemas, options = {}) {
	return Object.keys(schemas).reduce((result, key) => {
		result[(typeof options.prefix === 'string') ? `/${ options.prefix }/${ key }` : `/${ key }`] = construct(schemas[key], key);
		return result;
	}, {});
};
