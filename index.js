const elements = require('./periodicTable.json').elements.map(e => e.symbol)
const openingBrackets = ['(', '{', '[']
const closingBrackets = [')', '}', ']']

exports.parseMolecule = molecule => {
	const atoms = {}

	const processMoleculeSubGroup = (molecule, multiplicator = 1) => {
		let currentElement = null

		for (let i=0; i<molecule.length; i++) {

			if (openingBrackets.includes(molecule[i])) {
				const closingBracketIndex = findClosingBracket(molecule.substring(i+1, molecule.length))
				const { groupMultiplicator, cursorMul } = getGroupMultiplicator(molecule.substring(i+closingBracketIndex+2, molecule.length))
				processMoleculeSubGroup(molecule.substring(i+1, i+closingBracketIndex+1), groupMultiplicator * multiplicator)
				i+=cursorMul+molecule.substring(i, closingBracketIndex).length+3
			}

			else {
				const possibleLongestElement = molecule.substring(i, i+2);
				const index = elements.indexOf(possibleLongestElement)

				if (index >= 0) {
					currentElement = elements[index]
					i++;
				} 
				else {
					currentElement = molecule[i]
				}

				let { groupMultiplicator, cursorMul } = getGroupMultiplicator(molecule.substring(i+1, molecule.length))

				i += cursorMul

				if (!(currentElement in atoms)) {
					atoms[currentElement] = 0
				}

				atoms[currentElement] += groupMultiplicator * multiplicator
			}
		}

		return atoms
	}

	processMoleculeSubGroup(molecule)
	return atoms
}



const getGroupMultiplicator = str => {
	let groupMultiplicator = ''
	let cursorMul = 0

	while (!isNaN(str[cursorMul])) {
		groupMultiplicator += str[cursorMul]
		cursorMul++
	}

	groupMultiplicator = groupMultiplicator.length > 0 ? parseInt(groupMultiplicator) : 1 
	return { groupMultiplicator, cursorMul }
}

const findClosingBracket = str => {
	let openedBrackets = 1
	for(let i=0; i<str.length; i++) {
		if (openingBrackets.includes(str[i])) {
			openedBrackets++;
		}
		else if (closingBrackets.includes(str[i])) {
			openedBrackets--;
		}
		if (openedBrackets == 0) {
			return i
		}
	}
}