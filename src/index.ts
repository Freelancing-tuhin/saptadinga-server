import { Server } from "http";
import createApp from "./app";
import config from "./config/config";
import connectDb, { disconnectDb } from "./config/db.config";
import { logger } from "./utils/logger";

/**
 * Process entry point: connect to Mongo, start listening, and shut both down
 * cleanly on signal.
 */
const bootstrap = async (): Promise<void> => {
	await connectDb();

	const app = createApp();
	const server: Server = app.listen(config.server.port, () => {
		logger.info(`Server is running at http://localhost:${config.server.port}`);
	});

	const shutdown = (signal: string): void => {
		logger.info(`${signal} received, shutting down`);

		server.close(() => {
			void disconnectDb().finally(() => process.exit(0));
		});
	};

	["SIGINT", "SIGTERM"].forEach((signal) => process.on(signal, () => shutdown(signal)));
};

bootstrap().catch((error) => {
	logger.error("Failed to start server", error);
	process.exit(1);
});
