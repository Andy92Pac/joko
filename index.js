const elements = require('./periodicTable.json').elements.map(e => e.symbol)
const openingBrackets = ['(', '{', '[']
const closingBrackets = [')', '}', ']']

exports.parseMolecule = molecule => {
	const atoms = {}

	const processMoleculeSubGroup = (molecule, multiplicator = 1) => {
		let currentElement = null

		for (let i=0; i<molecule.length; i++) {

			if (openingBrackets.includes(molecule[i])) {
				const closingBracketIndex = findClosingBracket(molecule.substring(i))

				const { groupMultiplicator, multiplicatorLength } = getGroupMultiplicator(molecule.substring(i+closingBracketIndex+1))

				const newMultiplicator = groupMultiplicator * multiplicator

				const subGroup = molecule.substring(i, i+closingBracketIndex+1)
				const subGroupWithoutBrackets = subGroup.substring(1, subGroup.length-1)

				i+=multiplicatorLength+subGroup.length-1

				processMoleculeSubGroup(subGroupWithoutBrackets, newMultiplicator)

				
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

				let { groupMultiplicator, multiplicatorLength } = getGroupMultiplicator(molecule.substring(i+1, molecule.length))

				i += multiplicatorLength

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
	let multiplicatorLength = 0

	while (!isNaN(str[multiplicatorLength])) {
		groupMultiplicator += str[multiplicatorLength]
		multiplicatorLength++
	}

	groupMultiplicator = groupMultiplicator.length > 0 ? parseInt(groupMultiplicator) : 1 
	return { groupMultiplicator, multiplicatorLength }
}

const findClosingBracket = str => {
	let openedBrackets = 0
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