const coloredLog = (msg, type = 'success') => {
	const RED = '\x1b[31m';
	const GREEN = '\x1b[32m';
	const NC = '\x1b[0m';

	if (type === 'error') {
		return `${RED}${msg} ${NC}`;
	}

	return `${GREEN}${msg} ${NC}`;
};

module.exports = coloredLog;
