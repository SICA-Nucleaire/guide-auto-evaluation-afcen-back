/******************************************************************************
 * Copyright (c) 2022 SICA Nucléaire.                                         *
 *                                                                            *
 * This program is free software: you can redistribute it and/or modify       *
 * it under the terms of the GNU General Public License as published by       *
 * the Free Software Foundation, either version 3 of the License, or          *
 * (at your option) any later version.                                        *
 *                                                                            *
 * This program is distributed in the hope that it will be useful,            *
 * but WITHOUT ANY WARRANTY; without even the implied warranty of             *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the               *
 * GNU General Public License for more details.                               *
 *                                                                            *
 * You should have received a copy of the GNU General Public License          *
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.     *
 ******************************************************************************/

const {questions} = require('./db');

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

exports.getQuestionnaire = (theme) => {
	let tab                     = []
	const questionDebutant      = questions[0][theme]["Débutant"][getRandomInt(3)]
	const questionIntermediaire = questions[0][theme]["Intermédiaire"][getRandomInt(2)]
	const questionExpert        = questions[0][theme]["Expert"][getRandomInt(2)]
	tab.push(questionDebutant);
	tab.push(questionIntermediaire);
	tab.push(questionExpert);
	const id       = `${questionDebutant.id.substring(1).slice(
		0,
		-1
	)}-${questionIntermediaire.id.substring(1).slice(
		0,
		-1
	)}-${questionExpert.id.substring(1).slice(
		0,
		-1
	)}`
	const scoreMax = questionDebutant.scoreMax + questionIntermediaire.scoreMax + questionExpert.scoreMax
	tab.push({
		         "scoreMax" : scoreMax,
		         "id"       : id
	         })
	return tab
}

const isInArray = (
	array,
	intitule
) => {
	const requiredIndex = array.findIndex(el => {
		return el.intitule === String(intitule);
	})
	return requiredIndex !== -1;
}

exports.compareQuestionBonnesReponses = (
	numeroQuestion,
	bonnesReponses,
	theme,
	difficulte
) => {
	let questionTrouvee = {};
	for (const question of
		questions[0][theme][difficulte]) {
		if (question.numeroQuestion === numeroQuestion) {
			questionTrouvee = question;
		}
	}
	if (!questionTrouvee) {
		throw new Error('Question introuvable');
	}
	console.log(
		'questionTrouvee.bonnesReponses.length :',
		questionTrouvee.bonnesReponses.length
	)
	console.log(
		'bonnesReponses.length :',
		bonnesReponses.length
	)
	if (questionTrouvee.bonnesReponses.length !== bonnesReponses.length) {
		return false
	}
	
	if (bonnesReponses.length > 1) {
		for (const bonneReponse of
			bonnesReponses) {
			if (!isInArray(
				questionTrouvee.bonnesReponses,
				bonneReponse.intitule
			)) {
				return false
			}
		}
		return true
	}
	return JSON.stringify(bonnesReponses) === JSON.stringify(questionTrouvee.bonnesReponses)
}