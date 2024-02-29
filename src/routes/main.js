const router = require('express').Router();
const Task = require('../models/task');
const dataSource = require('../config/database');
const repository = dataSource.getRepository(Task);

router.route('/')
    .get(async (req, res) => {
        try {
            const data = await repository.find();
            res.json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    })
    .post(async (req, res) => {
        try {
            // const result = await repository.insert({
            //     title: req.body.title,
            //     description: req.body.description,
            //     dueDate: req.body.dueDate
            // });

            const record = await repository.create({
                title: req.body.title,
                description: req.body.description,
                dueDate: req.body.dueDate
            });
            const task = await repository.save(record);
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json(error);
        }
    });

router.route('/:id')
    .get(async (req, res) => {
        try {
            const task = await repository.findOne({
                where: {
                    id: req.params.id
                }
            });

            if (!task) {
                res.status(404).json('Task not found');
                return;
            }

            res.json(task);
        } catch (error) {
            res.status(500).json(error);
        }
    })
    .patch(async (req, res) => {
        try {
            const result = await repository.update(
                { id: req.params.id },
                {
                    title: req.body.title,
                    description: req.body.description,
                    dueDate: req.body.dueDate,
                    isFinished: req.body.isFinished
                });
            if (result.affected === 0) {
                res.status(404).json('Task not found');
                return;
            }
            res.status(200).json('Task updated successfully');
        } catch (error) {
            res.status(500).json(error);
        }
    })
    .delete(async (req, res) => {
        try {
            const result = await repository.delete({ id: req.params.id });
            if (result.affected === 0) {
                res.status(404).json('Task not found');
                return;
            }
            res.status(200).json('Task deleted successfully');
        } catch (error) {
            res.status(500).json(error);
        }
    });

module.exports = router;