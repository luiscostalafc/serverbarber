import io from 'socket.io';
import coloredLog from './lib/ColoredLog';

const socketActions = server => {
	const sio = io(server);

	sio.on('connection', socket => {
		const userId = socket.handshake.query;
		console.log(coloredLog(`${userId} socket is connected`));
		// const { user_id } = userId;
		// this.connectedUsers[user_id] = socket.id;

		socket.on('disconnect', () => {
			console.log(coloredLog(`${userId} socket is disconnect`));
			// delete this.connectedUsers[user_id];
		});
	});
	return sio;
};

export default socketActions;
