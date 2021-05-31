const reportService = require('../services/report.service');
const User = require('../mongoose-models/user.model');
const { formatPaged } = require('../util/paged-result.utility');

exports.getAll =  async (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        res.status(401).json({ success: false, message: 'No user logged In.' });
        return;
    }

    const user = await User.findById(userId);
    if (!user) {
        res.status(404).json({ success: false, message: `User with id ${userId} not found.` });
        return;
    }
    
    const { mongoQuery, mongoOptions } = req;
    mongoQuery.$and.push({ user: userId });
	const [reports, rowCount] = await reportService.getPaginated({ filter: mongoQuery, options: mongoOptions });
	const paged = formatPaged(reports, { ...mongoOptions, rowCount });
	res.status(200).json(paged);
	return;
}

exports.getOne = async (req, res) => {
    const reportId = req.params.id;
    const userId = req.query.userId;
    if (!userId) {
        res.status(401).json({ success: false, message: 'No user logged In.' });
        return;
    }

    const user = await User.findById(userId);
    if (!user) {
        res.status(404).json({ success: false, message: `User with id ${userId} not found.` });
        return;
    }

    const report = await reportService.getOne(reportId);
    if (report.user != userId) {
        res.status(403).json({ success: false, message: 'You are not authorized to perform this operation.' });
        return;
    }
    
    res.status(200).json(report || null);
    return;
}

exports.createReport = async (req, res) => {
    /**
     * req.body {
     * userId
     * reportData{}
     * }
     */
    const userId = req.body.userId;
    if (!userId) {
        res.status(401).json({ success: false, message: 'No user logged In.' });
        return;
    }

    const user = await User.findById(userId);
    if (!user) {
        res.status(404).json({ success: false, message: `User with id ${userId} not found.` });
        return;
    }

    const report = await reportService.create({
        ...req.body.reportData,
        user: userId,
    });
    res.status(200).json(report);
    return;
}

exports.updateReport = async (req, res) => {
    /**
     * req.body {
     * userId
     * reportId
     * reportData{}
     * }
     */
    const userId = req.body.userId;
    if (!userId) {
        res.status(401).json({ success: false, message: 'No user logged In.' });
        return;
    }

    const user = await User.findById(userId);
    if (!user) {
        res.status(404).json({ success: false, message: `User with id ${userId} not found.` });
        return;
    }

    const report = await reportService.getOne(req.body.reportId);

    if (report.user.id != userId) {
        res.status(403).json({ success: false, message: 'You are not authorized to perform this operation.' });
        return;
    }

    const updatedReport = await reportService.update(req.body.reportId, req.body.reportData);

    res.status(200).json(updatedReport);
    return;
}

exports.deleteReport = async (req, res) => {
    /**
     * req.body {
     * userId
     * }
     */
    const reportId = req.params.id;
    const userId = req.body.userId;
    if (!userId) {
        res.status(401).json({ success: false, message: 'No user logged In.' });
        return;
    }

    const user = await User.findById(userId);
    if (!user) {
        res.status(404).json({ success: false, message: `User with id ${userId} not found.` });
        return;
    }

    const report = await reportService.getOne(reportId);

    if (!report) {
        res.status(404).json({ success: false, message: `Report with id ${reportId} not found.` });
        return;
    }

    if (report.user.id != userId) {
        res.status(403).json({ success: false, message: 'You are not authorized to perform this operation.' });
        return;
    }

    await reportService.delete(reportId);

    res.status(200).json({ success: true });
    return;
}
