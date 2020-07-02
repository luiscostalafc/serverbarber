import coloredLog from './lib/ColoredLog';
// import io from 'socket.io';

const socketActions = server => {
	const io = require('socket.io')(server).listen(9090);
	console.log(coloredLog(`👌 [BOOT] socket is connected`));

	io.on('connection', socket => {
		io.emit('user connected');
		console.log(socket);
		const userId = socket.handshake.query;
		console.log(coloredLog(`${userId} socket is connected`));
		const { user_id } = userId;
		this.connectedUsers[user_id] = socket.id;

		socket.on('disconnect', () => {
			console.log(coloredLog(`${userId} socket is disconnect`));
			delete this.connectedUsers[user_id];
		});
	});
	return io;
};

export default socketActions;
