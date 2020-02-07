const assert = require('assert');
const { parseMolecule } = require('./../index')

describe('Tests molecular parser', function() {
	it('should return the correct object', function() {
		assert.deepEqual(parseMolecule('H2O'), {'H': 2, 'O': 1});
	});

	it('should return the correct object', function() {
		assert.deepEqual(parseMolecule('Mg(OH)2'), {'Mg': 1, 'O': 2, 'H': 2});
	});

	it('should return the correct object', function() {
		assert.deepEqual(parseMolecule('K4[ON(SO3)2]2'), {'K': 4, 'O': 14, 'N': 2, 'S': 4});
	});

	it('should return the correct object', function() {
		assert.deepEqual(parseMolecule('H2O'), { H: 2, O: 1 });
	});
});