const Report = require('../mongoose-models/report.model');

exports.getAll = async ({ filter, options }) => {
	try {
		return Report.find(filter, { 
			firstName: 1, 
			lastName: 1,
			doctorName: 1,
			pneumothorax: 1,
			diagnosis: 1, 
		}, options);		
	}
	catch (error) {
		console.error("error in ReportService.getAll()", error);
		throw error;
	}
}

exports.getPaginated = async ({ filter, options }) => {
	const reports = getAll({ filter, options });
	const rowCount = (await reports).length;
	return [
		await reports,
		rowCount
	];
}

exports.getOne = async (id) => {
	try {
		const report = await Report.findOne({ _id: id }, null, {});
		return report;
	}
	catch (error) {
		console.error("error in ReportService.getOne()", error);
		throw error;
	}
}

exports.create = async (reportData) => {
    try {
        const newReport = await Report.create(reportData);
        return newReport;
    }
    catch (error) {
        console.error('error in reportService.create()', error);
        throw error;
    }   
}

exports.update = async (id, reportData) => {
    try {
        const updatedReport = await Report.updateOne({_id: id}, reportData);
        return updatedReport;
    }
    catch (error) {
		console.error("error in ReportService.update()", error);
		throw error;
    }
}

exports.delete = async (id) => {
    try {
        const deletedReport = await Report.deleteOne({_id: id});
        return deletedReport;
    }
    catch (error) {
		console.error("error in ReportService.update()", error);
		throw error;
    }
}