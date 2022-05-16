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
	let tab = []
	const questionDebutant = questions[0][theme]["debutant"][getRandomInt(3)]
	const questionIntermediaire = questions[0][theme]["intermediaire"][getRandomInt(2)]
	const questionExpert = questions[0][theme]["expert"][getRandomInt(2)]
	tab.push(questionDebutant);
	tab.push(questionIntermediaire);
	tab.push(questionExpert);
	const scoreMax = questionDebutant.scoreMax + questionIntermediaire.scoreMax + questionExpert.scoreMax
	tab.push({
		         "scoreMax" : scoreMax,
		         // "id" : uuidv4()
	         })
	console.log(tab)
	return tab
}

exports.compareQuestionBonnesReponses = (numeroQuestion, bonnesReponses, theme, difficulte) => {
	let questionTrouvee = {};
	for (const question of questions[0][theme][difficulte]) {
		if (question.numeroQuestion === numeroQuestion) {
			questionTrouvee = question;
		}
	}

	if (!questionTrouvee) {
		throw new Error('Question introuvable');
	}

	return JSON.stringify(bonnesReponses) === JSON.stringify(questionTrouvee.bonnesReponses)
}