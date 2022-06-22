

const diff_minutes = (dt1, dt2) => {
	console.log(dt1);
	console.log(dt2);
	const seconds = (dt2 - dt1) / 1000;
	return seconds
};

const destroySession = async (req) => {
	try {
		req.session.destroy();
		next()
	} catch (error) {
		console.log(error);
		next(error)
	}
}

module.exports = { diff_minutes, destroySession };
