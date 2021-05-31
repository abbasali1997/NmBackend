exports.reportsQb = (req, res, next) => {
	try {
		const filter = _buildQuery(req.query);
		const options = _buildOptions(req.query);
		req.mongoQuery = filter;
		req.mongoOptions = options;
		next();
	}
	catch (error) {
		throw new Error(error);
	}
};


const _buildOptions = (query) => {
	const { page, pageSize, sort } = query;
	let options = {};

	let limit = parseInt(pageSize, 10) || 10;
	let skip = (parseInt(page - 1, 0) * limit) || 0;

	options = {
		...options,
		skip,
		limit
	};

	if (sort) {
		const sortBy = sort.split(",").join(" ");
		options = { ...options, sort: sortBy };
	}

	return options;
}


const _buildQuery = (query) => {
	const { s, diagnosis, pneumothorax, doctorName } = query;
	const filter = { $and: [] };
	
	if (s !== null && s !== undefined) {
		filter.$and.push({ $or: [
			{ firstName: new RegExp(`.*${s}.*`, "i") },
			{ lastName: new RegExp(`.*${s}.*`, "i") },
		] });
	}

	if (diagnosis !== null && diagnosis !== undefined) {
		filter.$and.push({ diagnosis });
	}

    if (pneumothorax !== null && pneumothorax !== undefined) {
		filter.$and.push({ pneumothorax: JSON.parse(pneumothorax) });
	}

    if (doctorName !== null && doctorName !== undefined) {
        filter.$and.push({ doctorName: new RegExp(`.*${doctorName}.*`, "i") });
	}

	return filter;
}
