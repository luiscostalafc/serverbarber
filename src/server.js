import app from './app';
import coloredLog from './lib/ColoredLog';

app.listen(3333, () => {
	// eslint-disable-next-line no-console
	console.log(coloredLog('🚀 Back-end started!'));
});
