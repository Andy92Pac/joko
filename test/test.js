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
		assert.deepEqual(parseMolecule('({H})2O'), { H: 2, O: 1 });
	});

	it('should return the correct object', function() {
		assert.deepEqual(parseMolecule('((({H})2)O)(O4)'), { H: 2, O: 5 });
	});

	it('should throw because of empty string', function() {
		assert.throws(() => parseMolecule(''), Error, "Molecule can't be an empty string");
	});

	it('should throw because of no atoms in string', function() {
		assert.throws(() => parseMolecule('()'), Error, "Molecule can't be an empty string");
	});

	it('should throw because of misplaced number', function() {
		assert.throws(() => parseMolecule('1'), Error, "Number must follow a closing bracket or an element");
	});

	it('should throw because of misplaced closing bracket', function() {
		assert.throws(() => parseMolecule(')H2O'), Error, "Closing bracket without opening bracket");
	});
	
	it('should throw because of missing closing bracket', function() {
		assert.throws(() => parseMolecule('H2O('), Error, "Non closing bracket");
	});

	it('should throw because of non existing element detected', function() {
		assert.throws(() => parseMolecule('H2OA'), Error, "Non existing element");
	});
});