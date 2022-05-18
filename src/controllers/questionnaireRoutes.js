const express = require('express');
const router = express.Router();
const questionnaireRepository = require('../models/questionnaireRepository');

router.post('/check', (req, res) => {
	res.json(
		questionnaireRepository
			.compareQuestionBonnesReponses(
				req.body.numeroQuestion,
				req.body.bonnesReponses,
				req.body.theme,
				req.body.difficulte))
	   .status(200)
})

router.post('/questionnaire', (req, res) => {
	res.json(
		questionnaireRepository
			.getQuestionnaire(
				req.body.theme,
				req.body.difficulte))
	   .status(200)
})

exports.initializeRoutes = () => {
	return router;
}